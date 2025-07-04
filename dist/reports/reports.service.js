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
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const types_1 = require("../common/types");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        console.log("creating ......");
        return this.prisma.report.create({
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.report.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findByPhoneNumber(phoneNumber) {
        return this.prisma.report.findMany({
            where: { phoneNumber },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async findOne(id) {
        const report = await this.prisma.report.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!report) {
            throw new common_1.NotFoundException("Report not found");
        }
        return report;
    }
    async update(id, userId, data) {
        const report = await this.prisma.report.findUnique({
            where: { id },
        });
        if (!report) {
            throw new common_1.NotFoundException("Report not found");
        }
        if (report.userId !== userId) {
            throw new common_1.ForbiddenException("You can only update your own reports");
        }
        return this.prisma.report.update({
            where: { id },
            data,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async adminUpdate(id, data) {
        console.log("Admin update called with:", { id, data });
        const report = await this.prisma.report.findUnique({
            where: { id },
        });
        if (!report) {
            console.log("Report not found:", id);
            throw new common_1.NotFoundException("Report not found");
        }
        console.log("Found report:", report);
        console.log("Updating with data:", data);
        try {
            const updatedReport = await this.prisma.report.update({
                where: { id },
                data,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            console.log("Successfully updated report:", updatedReport);
            return updatedReport;
        }
        catch (error) {
            console.error("Error updating report:", error);
            throw error;
        }
    }
    async delete(id, userId) {
        const report = await this.prisma.report.findUnique({
            where: { id },
        });
        if (!report) {
            throw new common_1.NotFoundException("Report not found");
        }
        if (report.userId !== userId) {
            throw new common_1.ForbiddenException("You can only delete your own reports");
        }
        return this.prisma.report.delete({
            where: { id },
        });
    }
    async getStats() {
        const total = await this.prisma.report.count();
        const pending = await this.prisma.report.count({
            where: { status: types_1.Status.PENDING },
        });
        const approved = await this.prisma.report.count({
            where: { status: types_1.Status.APPROVED },
        });
        const rejected = await this.prisma.report.count({
            where: { status: types_1.Status.REJECTED },
        });
        return {
            total,
            pending,
            approved,
            rejected,
        };
    }
    async getPublicStats() {
        const totalReports = await this.prisma.report.count();
        const totalUsers = await this.prisma.user.count({
            where: { isBlocked: false },
        });
        return {
            totalReports,
            totalUsers,
        };
    }
    async findRecentApproved() {
        return this.prisma.report.findMany({
            where: {
                status: types_1.Status.APPROVED
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 6,
        });
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map