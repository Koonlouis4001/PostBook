import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { SignUpAuthenDto } from './dto/sign-up-authen.dto';
import { LoginAuthenDto } from './dto/login-authen.dto';
import { AuthGuard } from './authen.guard';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/sign-up')
  signUp(@Body() signUpAuthenDto: SignUpAuthenDto) {
    return this.authenService.signUp(signUpAuthenDto);
  }

  @Post('/login')
  login(@Body() loginAuthenDto: LoginAuthenDto) {
    return this.authenService.login(loginAuthenDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUser(@Request() req: any) {
    return req.user;
  }
}
