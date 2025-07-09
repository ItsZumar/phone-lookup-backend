import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class BlockedUserGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Get the current user from database to check blocked status
    const currentUser = await this.usersService.findById(user.id);
    
    if (currentUser.isBlocked) {
      throw new UnauthorizedException('User account is blocked');
    }

    return true;
  }
} 