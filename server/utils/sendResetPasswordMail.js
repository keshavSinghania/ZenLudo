import nodemailer from 'nodemailer';

const sendResetPasswordMail = async (to, resetUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'ZenLudo Password Reset',
      html: `
        <div style="background-color: #0d0d21; padding: 20px; color: #e0e0e0; font-family: 'Arial', sans-serif; text-align: center;">
          <div style="background: rgba(23, 23, 46, 0.7); max-width: 600px; margin: auto; padding: 30px; border-radius: 16px; border: 1px solid #4a236f; box-shadow: 0 0 15px rgba(128, 0, 128, 0.5);">
            <h2 style="font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #f06, #a85, #0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 8px #f06, 0 0 10px #0ff;">
              ZenLudo
            </h2>
            <h3 style="color: #c9a4e0; font-size: 22px; margin-bottom: 20px;">
              Password Reset Request
            </h3>
            <p style="font-size: 16px; line-height: 1.6; color: #d0d0d0;">
              Hello there,
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #d0d0d0;">
              You recently requested to reset your password. Click the button below to proceed.
            </p>
            
            <a href="${resetUrl}" style="display: inline-block; text-decoration: none; font-size: 18px; font-weight: bold; color: #fff; text-align: center; margin: 40px auto; padding: 15px 30px; border-radius: 50px; background: linear-gradient(to right, #f06, #a85); box-shadow: 0 0 15px rgba(255, 0, 102, 0.6); transition: all 0.3s ease-in-out;">
              Reset Password
            </a>
            
            <p style="font-size: 14px; color: #8a8a9a;">
              This link is valid for <strong>5 minutes</strong>. For your security, please do not share it.
            </p>
            <p style="font-size: 14px; color: #8a8a9a;">
              If you didn't request a password reset, you can safely ignore this email.
            </p>
            
            <div style="border-top: 1px solid #333; margin-top: 30px; padding-top: 20px;">
              <p style="font-size: 12px; color: #5a5a6a;">
                &copy; ${new Date().getFullYear()} ZenLudo | All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
    return true;
  } catch (error) {
    console.error(` Failed to send password reset email to ${to}:`, error.message);
    throw new Error('Failed to send password reset email');
  }
};

export default sendResetPasswordMail;