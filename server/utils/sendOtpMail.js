import nodemailer from 'nodemailer';

const sendOtpMail = async (to, otp) => {

  console.log("========== OTP MAIL DEBUG START ==========");

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
  console.log("EMAIL_PASS length:", process.env.EMAIL_PASS?.length);
  console.log("Recipient:", to);
  console.log("OTP:", otp);

  try {

    console.log("Step 1: Creating transporter...");

    const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    console.log("Step 2: Transporter created");

    console.log("Step 3: Verifying SMTP connection...");

    await transporter.verify();

    console.log("Step 4: SMTP connection successful");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'ZenLudo Login OTP', 
      html: `
        <div style="background-color: #0d0d21; padding: 20px; color: #e0e0e0; font-family: 'Arial', sans-serif; text-align: center;">
          <div style="background: rgba(23, 23, 46, 0.7); max-width: 600px; margin: auto; padding: 30px; border-radius: 16px; border: 1px solid #4a236f; box-shadow: 0 0 15px rgba(128, 0, 128, 0.5);">
            <h2 style="font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px; background: linear-gradient(90deg, #f06, #a85, #0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 0 8px #f06, 0 0 10px #0ff;">
              ZenLudo
            </h2>

            <h3 style="color: #c9a4e0; font-size: 22px; margin-bottom: 20px;">
              OTP Verification
            </h3>

            <p style="font-size: 16px; line-height: 1.6; color: #d0d0d0;">
              Hello there,
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: #d0d0d0;">
              Use the following One-Time Password (OTP) to complete the process.
            </p>
            
            <div style="font-size: 32px; font-weight: bold; color: #0ff; text-align: center; margin: 40px 0; padding: 20px; background: #1f1f3e; border-radius: 10px; border: 1px solid #0ff; box-shadow: 0 0 10px #0ff; letter-spacing: 5px;">
              ${otp}
            </div>
            
            <p style="font-size: 14px; color: #8a8a9a;">
              This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone for your security.
            </p>

            <p style="font-size: 14px; color: #8a8a9a;">
              If you didn't request this, you can safely ignore this email.
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

    console.log("Step 5: Mail options created");
    console.log("From:", mailOptions.from);
    console.log("To:", mailOptions.to);
    console.log("Subject:", mailOptions.subject);

    console.log("Step 6: Sending email...");

    const info = await transporter.sendMail(mailOptions);

    console.log("Step 7: Email sent successfully");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);

    console.log("========== OTP MAIL DEBUG END ==========");

    return true;

  } catch (error) {

    console.error("========== OTP MAIL ERROR ==========");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error command:", error.command);
    console.error("Full error:", error);
    console.error("====================================");

    throw new Error('Failed to send OTP email');
  }
};

export default sendOtpMail;
