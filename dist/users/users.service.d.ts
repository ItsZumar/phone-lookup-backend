import { PrismaService } from '../common/prisma.service';
import { Role } from '../common/types';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        password: string;
        name: string;
        role?: Role;
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
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByIdWithPassword(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: {
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
    updateProfile(id: string, data: {
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
    delete(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        role: import("generated/prisma").$Enums.Role;
        isBlocked: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, hashedPassword: string): Promise<{
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
