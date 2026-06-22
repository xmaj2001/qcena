export const emailEnv = () => ({
  provider: process.env.EMAIL_PROVIDER ?? 'resend',
  from: process.env.EMAIL_FROM ?? 'noreply@transcender.app',
  resendApiKey: process.env.RESEND_API_KEY ?? '',
  smtp: {
    host: process.env.SMTP_HOST ?? 'localhost',
    port: parseInt(process.env.SMTP_PORT ?? '587', 10),
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
  },
});
