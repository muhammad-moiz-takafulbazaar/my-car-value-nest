import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: admin.guard.ts:10 ~ AdminGuard ~ request.CurrentUser:',
      request.CurrentUser,
    );
    if (!request.CurrentUser) {
      return false;
    }

    console.log(
      '🚀 ~ file: admin.guard.ts:14 ~ AdminGuard ~ request.CurrentUser.admin:',
      request.CurrentUser.admin,
    );
    return request.CurrentUser.admin;
  }
}
