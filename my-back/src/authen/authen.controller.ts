import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Res, Req, Headers } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { SignUpAuthenDto } from './dto/sign-up-authen.dto';
import { SignInAuthenDto } from './dto/sign-in-authen.dto';
import { AuthGuard } from './authen.guard';
import { AuthRefreshGuard } from './authen.refresh.guard';

@Controller('authen')
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/sign-up')
  signUp(@Body() signUpAuthenDto: SignUpAuthenDto) {
    return this.authenService.signUp(signUpAuthenDto);
  }

  @Post('/login')
  async login(@Body() signInAuthenDto: SignInAuthenDto) {
    return this.authenService.signIn(signInAuthenDto);
  }

  @UseGuards(AuthRefreshGuard)
  @Get('/refresh/:id')
  async refresh(@Param('id') id: number,@Headers() headers: any) {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return this.authenService.refresh(id,token);
  }

  @UseGuards(AuthGuard)
  @Get('/logout/:id')
  async logout(@Param('id') id: number) {
    this.authenService.logout(id);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUser(@Request() req: any) {
    return req.user;
  }
}
