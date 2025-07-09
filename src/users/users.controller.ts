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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/types';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update own profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: { name?: string; email?: string },
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update user (admin only)' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: { name?: string },
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('profile')
  @ApiOperation({ summary: 'Delete own account' })
  @ApiResponse({ status: 200, description: 'Account deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteOwnAccount(@Request() req) {
    return this.usersService.delete(req.user.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete user (admin only)' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Patch(':id/block')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Block user (admin only)' })
  @ApiResponse({ status: 200, description: 'User blocked successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }

  @Patch(':id/unblock')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Unblock user (admin only)' })
  @ApiResponse({ status: 200, description: 'User unblocked successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async unblockUser(@Param('id') id: string) {
    return this.usersService.unblockUser(id);
  }

  @Patch(':id/toggle-block')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Toggle user block status (admin only)' })
  @ApiResponse({ status: 200, description: 'User block status toggled successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async toggleBlockUser(@Param('id') id: string) {
    return this.usersService.toggleBlockUser(id);
  }
} 