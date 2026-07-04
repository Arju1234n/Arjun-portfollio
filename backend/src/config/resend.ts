import { Resend } from 'resend';
import { env } from './env';

/**
 * Configured Resend client instance.
 * Import this wherever you need to send emails.
 */
export const resendClient = new Resend(env.RESEND_API_KEY);
