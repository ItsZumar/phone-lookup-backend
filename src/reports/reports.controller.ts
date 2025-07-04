import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, Category, Status } from '../common/types';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('public/recent')
  @ApiOperation({ summary: 'Get recent approved reports (public)' })
  @ApiResponse({ status: 200, description: 'Recent reports retrieved successfully' })
  async getRecentPublic() {
    return this.reportsService.findRecentApproved();
  }

  @Get('public/stats')
  @ApiOperation({ summary: 'Get public statistics' })
  @ApiResponse({ status: 200, description: 'Public statistics retrieved successfully' })
  async getPublicStats() {
    return this.reportsService.getPublicStats();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a new report' })
  @ApiResponse({ status: 201, description: 'Report created successfully' })
  async create(
    @Request() req,
    @Body() createReportDto: {
      phoneNumber: string;
      category: Category;
      message: string;
    },
  ) {
    return this.reportsService.create({
      ...createReportDto,
      userId: req.user.id,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async findAll() {
    return this.reportsService.findAll();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search reports by phone number' })
  @ApiResponse({ status: 200, description: 'Reports retrieved successfully' })
  async search(@Query('phoneNumber') phoneNumber: string) {
    return this.reportsService.findByPhoneNumber(phoneNumber);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get report statistics (admin only)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getStats() {
    return this.reportsService.getStats();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiResponse({ status: 200, description: 'Report retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async findOne(@Param('id') id: string) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update report' })
  @ApiResponse({ status: 200, description: 'Report updated successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateReportDto: { 
      status?: Status;
      phoneNumber?: string;
      message?: string;
      category?: Category;
    },
  ) {
    return this.reportsService.update(id, req.user.id, updateReportDto);
  }

  @Patch(':id/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update report (admin only)' })
  @ApiResponse({ status: 200, description: 'Report updated successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async adminUpdate(
    @Param('id') id: string,
    @Body() updateReportDto: { 
      status?: Status;
      phoneNumber?: string;
      message?: string;
      category?: Category;
    },
  ) {
    console.log("Admin update endpoint called with:", { id, updateReportDto });
    return this.reportsService.adminUpdate(id, updateReportDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete report' })
  @ApiResponse({ status: 200, description: 'Report deleted successfully' })
  @ApiResponse({ status: 404, description: 'Report not found' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.reportsService.delete(id, req.user.id);
  }
} 