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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_service_1 = require("./contact.service");
const contact_dto_1 = require("./dto/contact.dto");
let ContactController = class ContactController {
    constructor(contactService) {
        this.contactService = contactService;
    }
    async submitContactForm(contactData) {
        try {
            const success = await this.contactService.sendContactEmail(contactData);
            if (success) {
                return {
                    message: 'Contact form submitted successfully. We will get back to you soon!',
                    status: 'success',
                };
            }
            else {
                throw new common_1.HttpException('Failed to send email. Please try again later.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            console.error('Contact form submission error:', error);
            throw new common_1.HttpException('An error occurred while processing your request. Please try again later.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testEmailConnection() {
        try {
            const isConnected = await this.contactService.testEmailConnection();
            return {
                message: isConnected ? 'Email connection successful' : 'Email connection failed',
                status: isConnected ? 'success' : 'error',
                connected: isConnected,
            };
        }
        catch (error) {
            console.error('Email connection test error:', error);
            return {
                message: 'Email connection test failed',
                status: 'error',
                connected: false,
                error: error.message,
            };
        }
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit contact form' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Contact form submitted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.ContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "submitContactForm", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test email connection' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email connection test result' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "testEmailConnection", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('contact'),
    (0, common_1.Controller)('contact'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map