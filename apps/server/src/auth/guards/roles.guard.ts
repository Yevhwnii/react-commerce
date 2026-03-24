import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../users/entities/user.entity';
import type { JwtPayload } from '../strategies';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!roles) return true;

    const user: JwtPayload = ctx.switchToHttp().getRequest().user;
    return roles.includes(user.role as UserRole);
  }
}
