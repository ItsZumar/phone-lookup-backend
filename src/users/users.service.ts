import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Role } from '../common/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    role?: Role;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: {
        ...data,
        role: data.role || Role.USER,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByIdWithPassword(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: { name?: string }) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, data: { name?: string; email?: string }) {
    // Check if email is being updated and if it already exists
    if (data.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isBlocked: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async delete(id: string) {
    // First, delete all reports associated with this user
    await this.prisma.report.deleteMany({
      where: { userId: id },
    });

    // Then delete the user
    const user = await this.prisma.user.delete({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updatePassword(id: string, hashedPassword: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async blockUser(id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isBlocked: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async unblockUser(id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isBlocked: false },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async toggleBlockUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: { isBlocked: !user.isBlocked },
    });
  }
} 
 