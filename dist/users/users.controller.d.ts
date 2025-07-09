import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, updateProfileDto: {
        name?: string;
        email?: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: {
        name?: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteOwnAccount(req: any): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    blockUser(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    unblockUser(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleBlockUser(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
