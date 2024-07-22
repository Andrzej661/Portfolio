import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDtoCreate, AuthDtoLogin } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constants/constants';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { LoginStatusProps } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthDtoCreate) {
    const { email, password, username } = dto;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
        username,
      },
    });

    return { message: 'User created succefully' };
  }

  async signin(dto: AuthDtoLogin, req: Request, res: Response) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) {
      throw new BadRequestException('Wrong credentials');
    }

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.hashedPassword,
    });

    if (!compareSuccess) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.signToken({
      userId: foundUser.id,
      email: foundUser.email,
    });

    if (!token) {
      throw new ForbiddenException('Could not signin');
    }

    res.cookie('token', token, {});

    return res.send({ message: 'Logged in succefully' });
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');

    return res.send({ message: 'Logged out succefully' });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; email: string }) {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
    });

    return token;
  }

  async isLoggedIn(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.cookies['token'];
      if (!token) {
        return res
          .status(401)
          .send({ loggedIn: false, message: 'No token provided' });
      }

      try {
        this.jwt.verify(token);
        const decodedToken = jwtDecode(token) as LoginStatusProps;
        const userEmail = decodedToken.email;
        return res.send({
          loggedIn: true,
          message: 'Logged in successfully',
          userEmail,
        });
      } catch (error) {
        console.error('Error verifying token:', error);
        return res
          .status(401)
          .send({ loggedIn: false, message: 'Invalid token' });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      return res
        .status(500)
        .send({ loggedIn: false, message: 'Failed to authenticate token' });
    }
  }
  // async checkUser = (req: Request, res: Response): Promise<Response> {
  // const token = req.cookies.jwt;

  // if(token){
  //   this.jwt.verifyAsync(token)
  // }

  // }
}
