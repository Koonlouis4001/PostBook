import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { SignUpAuthenDto } from './dto/sign-up-authen.dto';
import { LoginAuthenDto } from './dto/login-authen.dto';

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
}
