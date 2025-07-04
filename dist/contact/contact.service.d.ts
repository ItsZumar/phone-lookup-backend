import { ContactDto } from "./dto/contact.dto";
export declare class ContactService {
    private transporter;
    constructor();
    sendContactEmail(contactData: ContactDto): Promise<boolean>;
    testEmailConnection(): Promise<boolean>;
}
