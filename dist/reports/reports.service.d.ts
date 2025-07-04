import { PrismaService } from "../common/prisma.service";
import { Category, Status } from "../common/types";
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        phoneNumber: string;
        category: Category;
        message: string;
        userId: string;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findByPhoneNumber(phoneNumber: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    update(id: string, userId: string, data: {
        status?: Status;
        phoneNumber?: string;
        message?: string;
        category?: Category;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    adminUpdate(id: string, data: {
        status?: Status;
        phoneNumber?: string;
        message?: string;
        category?: Category;
    }): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    }>;
    getPublicStats(): Promise<{
        totalReports: number;
        totalUsers: number;
    }>;
    findRecentApproved(): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
}
