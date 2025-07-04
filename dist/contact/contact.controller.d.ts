import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    submitContactForm(contactData: ContactDto): Promise<{
        message: string;
        status: string;
    }>;
    testEmailConnection(): Promise<{
        message: string;
        status: string;
        connected: boolean;
        error?: undefined;
    } | {
        message: string;
        status: string;
        connected: boolean;
        error: any;
    }>;
}
