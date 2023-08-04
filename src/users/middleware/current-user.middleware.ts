import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
// import { User } from '../user.entity';

// needed but no in my code
// declare global {
//   namespace Express {
//     interface Request {
//       CurrentUser?: User;
//     }
//   }
// }

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.userService.findOne(userId);
      req.CurrentUser = user;
    }

    next();
  }
}
