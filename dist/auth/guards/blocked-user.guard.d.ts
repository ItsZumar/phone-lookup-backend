import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
export declare class BlockedUserGuard implements CanActivate {
    private usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
