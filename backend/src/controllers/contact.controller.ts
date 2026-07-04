import { Request, Response, NextFunction } from 'express';
import { ContactMessage } from '../models/ContactMessage';
import { AppError } from '../middleware/error';
import { resendClient } from '../config/resend';
import { env } from '../config/env';

/** POST /contact  (public — from portfolio form) */
export async function submitContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) throw new AppError('name, email and message are required', 400);

    const msg = await ContactMessage.create({ name, email, subject, message });

    // Notify admin via email (skip if Resend not configured)
    if (!env.RESEND_API_KEY.startsWith('re_your')) {
      try {
        await resendClient.emails.send({
          from: env.EMAIL_FROM,
          to:   env.ADMIN_EMAIL_NOTIFY,
          subject: `[Portfolio] New message from ${name}`,
          html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
                 <p><strong>Subject:</strong> ${subject ?? '—'}</p>
                 <hr/>
                 <p>${message.replace(/\n/g, '<br/>')}</p>`,
        });
      } catch (emailErr) {
        // Log but don't fail the request
        console.warn('Email notification failed:', emailErr);
      }
    }

    res.status(201).json({ success: true, message: 'Message sent successfully', data: { id: msg._id } });
  } catch (err) { next(err); }
}

/** GET /contact/messages (admin) */
export async function listMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const { read, page = '1', limit = '20', search } = req.query as Record<string, string>;
    const filter: any = {};
    if (read !== undefined) filter.read = read === 'true';
    if (search) filter.$or = [
      { name:    { $regex: search, $options: 'i' } },
      { email:   { $regex: search, $options: 'i' } },
      { subject: { $regex: search, $options: 'i' } },
      { message: { $regex: search, $options: 'i' } },
    ];

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      ContactMessage.countDocuments(filter),
    ]);

    res.json({ success: true, data: items, meta: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)), unread: await ContactMessage.countDocuments({ read: false }) } });
  } catch (err) { next(err); }
}

/** PATCH /contact/messages/:id/read */
export async function markRead(req: Request, res: Response, next: NextFunction) {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!msg) throw new AppError('Message not found', 404);
    res.json({ success: true, data: msg });
  } catch (err) { next(err); }
}

/** POST /contact/messages/:id/reply */
export async function replyMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const { body: replyBody } = req.body;
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) throw new AppError('Message not found', 404);

    if (!env.RESEND_API_KEY.startsWith('re_your')) {
      await resendClient.emails.send({
        from:    env.EMAIL_FROM,
        to:      msg.email,
        subject: `Re: ${msg.subject ?? 'Your message'}`,
        html:    `<p>Hi ${msg.name},</p>${replyBody}<br/><br/><p>— Arjun Kumar</p>`,
      });
    }

    await ContactMessage.findByIdAndUpdate(req.params.id, { replied: true, repliedAt: new Date(), read: true });
    res.json({ success: true, message: 'Reply sent' });
  } catch (err) { next(err); }
}

/** DELETE /contact/messages/:id */
export async function deleteMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) throw new AppError('Message not found', 404);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

/** GET /contact/messages/export */
export async function exportMessages(req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    const rows = messages.map(m => ({
      name: m.name, email: m.email, subject: m.subject ?? '',
      message: m.message, read: m.read, replied: m.replied, date: m.createdAt,
    }));
    const headers = Object.keys(rows[0] ?? {});
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => JSON.stringify((r as any)[h] ?? '')).join(','))].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="messages.csv"');
    res.send(csv);
  } catch (err) { next(err); }
}
