import { Strategy } from 'passport-jwt';
import { UsersService } from '@/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        id: any;
        email: any;
        role: import("generated/prisma").$Enums.Role;
    }>;
}
export {};
