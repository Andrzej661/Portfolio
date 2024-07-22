import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const decodedUserInfo = req.user as {
      id: string;
      email: string;
      username: string;
    };

    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.hashedPassword;

    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, username: true },
    });

    return { users };
  }
}
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
