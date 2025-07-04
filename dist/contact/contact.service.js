"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let ContactService = class ContactService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendContactEmail(contactData) {
        try {
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
            await this.transporter.sendMail(adminMailOptions);
            await this.transporter.sendMail(userMailOptions);
            return true;
        }
        catch (error) {
            console.error("Error sending contact email:", error);
            return false;
        }
    }
    async testEmailConnection() {
        try {
            await this.transporter.verify();
            return true;
        }
        catch (error) {
            console.error("Email connection test failed:", error);
            return false;
        }
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ContactService);
//# sourceMappingURL=contact.service.js.map