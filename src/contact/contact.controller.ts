import { Controller, Post, Body, Get, HttpStatus, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@ApiTags('contact')
@Controller('contact')
@UsePipes(new ValidationPipe({ transform: true }))
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiOperation({ summary: 'Submit contact form' })
  @ApiResponse({ status: 201, description: 'Contact form submitted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async submitContactForm(@Body() contactData: ContactDto) {
    try {
      const success = await this.contactService.sendContactEmail(contactData);

      if (success) {
        return {
          message: 'Contact form submitted successfully. We will get back to you soon!',
          status: 'success',
        };
      } else {
        throw new HttpException(
          'Failed to send email. Please try again later.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw new HttpException(
        'An error occurred while processing your request. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('test')
  @ApiOperation({ summary: 'Test email connection' })
  @ApiResponse({ status: 200, description: 'Email connection test result' })
  async testEmailConnection() {
    try {
      const isConnected = await this.contactService.testEmailConnection();
      
      return {
        message: isConnected ? 'Email connection successful' : 'Email connection failed',
        status: isConnected ? 'success' : 'error',
        connected: isConnected,
      };
    } catch (error) {
      console.error('Email connection test error:', error);
      return {
        message: 'Email connection test failed',
        status: 'error',
        connected: false,
        error: error.message,
      };
    }
  }
} 