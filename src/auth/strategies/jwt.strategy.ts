import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    });
  }

  async validate(payload: any) {
    // Get the current user
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new UnauthorizedException('User account is blocked');
    }
    
    return {
      id: payload.sub,
      email: payload.email,
      role: user.role, // Use role from database, not from JWT payload
    };
  }
} 