import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private static instance;
    constructor();
    static getInstance(): PrismaService;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
