import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../common/prisma.service";
import { Category, Status } from "../common/types";

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { phoneNumber: string; category: Category; message: string; userId: string }) {
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

  async findByPhoneNumber(phoneNumber: string) {
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

  async findOne(id: string) {
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
      throw new NotFoundException("Report not found");
    }

    return report;
  }

  async update(id: string, userId: string, data: { 
    status?: Status;
    phoneNumber?: string;
    message?: string;
    category?: Category;
  }) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException("Report not found");
    }

    if (report.userId !== userId) {
      throw new ForbiddenException("You can only update your own reports");
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

  async adminUpdate(id: string, data: { 
    status?: Status;
    phoneNumber?: string;
    message?: string;
    category?: Category;
  }) {
    console.log("Admin update called with:", { id, data });
    
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      console.log("Report not found:", id);
      throw new NotFoundException("Report not found");
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
    } catch (error) {
      console.error("Error updating report:", error);
      throw error;
    }
  }

  async delete(id: string, userId: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
    });

    if (!report) {
      throw new NotFoundException("Report not found");
    }

    if (report.userId !== userId) {
      throw new ForbiddenException("You can only delete your own reports");
    }

    return this.prisma.report.delete({
      where: { id },
    });
  }

  async getStats() {
    const total = await this.prisma.report.count();
    const pending = await this.prisma.report.count({
      where: { status: Status.PENDING },
    });
    const approved = await this.prisma.report.count({
      where: { status: Status.APPROVED },
    });
    const rejected = await this.prisma.report.count({
      where: { status: Status.REJECTED },
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
    const totalUsers = await this.prisma.user.count();

    return {
      totalReports,
      totalUsers,
    };
  }

  async findRecentApproved() {
    return this.prisma.report.findMany({
      where: { 
        status: Status.APPROVED 
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
      take: 6, // Limit to 6 most recent approved reports
    });
  }
}
