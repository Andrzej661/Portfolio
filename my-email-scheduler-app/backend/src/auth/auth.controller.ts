import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoCreate, AuthDtoLogin } from './dto/auth.dto';
// import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
// import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoCreate) {
    return this.authService.signup(dto), { message: 'signup was succesfull' };
  }
  @Post('signin')
  signin(@Body() dto: AuthDtoLogin, @Req() req, @Res() res) {
    return this.authService.signin(dto, req, res);
  }
  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
  @Post('isLoggedIn')
  isLoggedIn(@Req() req: Request, @Res() res: Response) {
    // If the request reaches here, it means the JWT validation passed
    return this.authService.isLoggedIn(req, res);
  }
}
