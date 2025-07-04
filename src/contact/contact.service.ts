import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ContactDto } from "./dto/contact.dto";

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create transporter using environment variables
    this.transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST || "smtp.gmail.com",
      // port: parseInt(process.env.SMTP_PORT) || 587,
      // secure: false, // true for 465, false for other ports
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactEmail(contactData: ContactDto): Promise<boolean> {
    try {
      // Email to admin
      const adminMailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Submission: ${contactData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p><small>This message was sent from the PhoneGuard contact form.</small></p>
        `,
      };

      // Confirmation email to user
      const userMailOptions = {
        from: process.env.SMTP_USER,
        to: contactData.email,
        subject: "Thank you for contacting PhoneGuard",
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${contactData.name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${contactData.message.replace(/\n/g, "<br>")}</p>
          <hr>
          <p>Best regards,<br>The PhoneGuard Team</p>
        `,
      };

      // Send both emails
      await this.transporter.sendMail(adminMailOptions);
      await this.transporter.sendMail(userMailOptions);

      return true;
    } catch (error) {
      console.error("Error sending contact email:", error);
      return false;
    }
  }

  async testEmailConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email connection test failed:", error);
      return false;
    }
  }
}
