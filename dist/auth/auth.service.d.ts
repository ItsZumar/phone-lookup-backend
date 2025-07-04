import { JwtService } from "@nestjs/jwt";
import { UsersService } from "@/users/users.service";
import { Role } from "../common/types";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
    register(userData: {
        email: string;
        password: string;
        name: string;
        role?: Role;
    }): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
