import { ReportsService } from './reports.service';
import { Category, Status } from '../common/types';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getRecentPublic(): Promise<({
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
    getPublicStats(): Promise<{
        totalReports: number;
        totalUsers: number;
    }>;
    create(req: any, createReportDto: {
        phoneNumber: string;
        category: Category;
        message: string;
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
    search(phoneNumber: string): Promise<({
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
    getStats(): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    }>;
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
    update(id: string, req: any, updateReportDto: {
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
    adminUpdate(id: string, updateReportDto: {
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
    remove(id: string, req: any): Promise<{
        id: string;
        phoneNumber: string;
        category: import("generated/prisma").$Enums.Category;
        message: string;
        status: import("generated/prisma").$Enums.Status;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
