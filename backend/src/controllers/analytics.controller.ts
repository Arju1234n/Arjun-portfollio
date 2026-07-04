import { Request, Response, NextFunction } from 'express';
import { PageView } from '../models/PageView';
import { Resume } from '../models/Resume';
import { Project } from '../models/Project';
import { ContactMessage } from '../models/ContactMessage';
import { ActivityLog } from '../models/ActivityLog';
import { SiteSettings } from '../models/SiteSettings';

/** POST /analytics/pageview  (public) */
export async function trackPageView(req: Request, res: Response, next: NextFunction) {
  try {
    const { path, referrer } = req.body;
    const ua = req.get('user-agent') ?? '';
    const device = /mobile/i.test(ua) ? 'mobile' : /tablet/i.test(ua) ? 'tablet' : 'desktop';
    const browser = /chrome/i.test(ua) ? 'Chrome' : /safari/i.test(ua) ? 'Safari' : /firefox/i.test(ua) ? 'Firefox' : 'Other';
    await PageView.create({ path, referrer, userAgent: ua, device, browser });
    res.json({ success: true });
  } catch (err) { next(err); }
}

/** GET /analytics/summary (admin) */
export async function getSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const now   = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      visitorsToday, visitorsMonth, totalProjects,
      totalMessages, totalDownloads,
      recentActivity,
      deviceBreakdown, browserBreakdown, dailyVisits,
    ] = await Promise.all([
      PageView.countDocuments({ createdAt: { $gte: today } }),
      PageView.countDocuments({ createdAt: { $gte: monthStart } }),
      Project.countDocuments({ status: 'published' }),
      ContactMessage.countDocuments(),
      Resume.aggregate([{ $group: { _id: null, total: { $sum: '$downloadCount' } } }]),
      ActivityLog.find().sort({ createdAt: -1 }).limit(10).populate('adminId', 'name'),
      PageView.aggregate([{ $group: { _id: '$device', count: { $sum: 1 } } }]),
      PageView.aggregate([{ $group: { _id: '$browser', count: { $sum: 1 } } }]),
      PageView.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          visitorsToday,
          visitorsMonth,
          totalProjects,
          totalMessages,
          totalDownloads: totalDownloads[0]?.total ?? 0,
        },
        charts: { deviceBreakdown, browserBreakdown, dailyVisits },
        recentActivity,
      },
    });
  } catch (err) { next(err); }
}

/** GET /settings */
export async function getSettings(req: Request, res: Response, next: NextFunction) {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}

/** PATCH /settings */
export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    // Deep merge nested objects (theme, seo, footer, analytics, navigation)
    const body = req.body;
    if (body.seo)        Object.assign(settings.seo, body.seo);
    if (body.theme)      Object.assign(settings.theme, body.theme);
    if (body.footer)     Object.assign(settings.footer, body.footer);
    if (body.analytics)  Object.assign(settings.analytics, body.analytics);
    if (body.navigation) settings.navigation = body.navigation;
    settings.markModified('seo');
    settings.markModified('theme');
    settings.markModified('footer');
    settings.markModified('analytics');
    settings.markModified('navigation');
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (err) { next(err); }
}

/** GET /activity */
export async function listActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const { page = '1', limit = '50' } = req.query as Record<string, string>;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      ActivityLog.find().sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('adminId', 'name email'),
      ActivityLog.countDocuments(),
    ]);
    res.json({ success: true, data: items, meta: { page: parseInt(page), limit: parseInt(limit), total } });
  } catch (err) { next(err); }
}
