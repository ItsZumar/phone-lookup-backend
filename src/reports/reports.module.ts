import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaService } from '../common/prisma.service';

@Module({
  providers: [ReportsService, PrismaService],
  controllers: [ReportsController],
  exports: [ReportsService],
})
export class ReportsModule {} 