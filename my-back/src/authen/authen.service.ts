import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpAuthenDto } from './dto/sign-up-authen.dto';
import { SignInAuthenDto } from './dto/sign-in-authen.dto';
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Repository } from 'typeorm';
import { Authen } from './entities/authen.entity';

@Injectable()
export class AuthenService {
  constructor(
    @InjectRepository(Authen) private readonly authenRepository: Repository<Authen>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(signUpAuthenDto: SignUpAuthenDto) {
    const {userName,password} = signUpAuthenDto;
    if(userName.trim().length === 0) {
      throw new BadRequestException('Username is empty');
    }
    if(password.trim().length === 0) {
      throw new BadRequestException('Password is empty');
    }
    const user = await this.userService.findByUsername(userName);
    if(user) {
      throw new BadRequestException('This user is already exist');
    }
    const hashPassword = await this.hashData(password);
    const currentDate = new Date();
    const newUser = await this.userService.create({...signUpAuthenDto,password: hashPassword});
    const tokens = await this.getTokens(newUser.id, newUser.userName,newUser.profile?.id,newUser.profile?.profileName);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(signInAuthenDto: SignInAuthenDto) {
    const {userName,password} = signInAuthenDto;
    if(userName.trim().length === 0) {
      throw new BadRequestException('Username is empty');
    }
    if(password.trim().length === 0) {
      throw new BadRequestException('Password is empty');
    }
    const user = await this.userService.findByUsername(userName);
    if(!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password);
    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const tokens = await this.getTokens(user.id, user.userName,user.profile?.id,user.profile?.profileName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(refreshToken: string) {
    const decodeToken = this.jwtService.decode(refreshToken);
    const updateUserDto = new UpdateUserDto;
    updateUserDto.refreshToken = null;
    return this.userService.update(decodeToken.id, updateUserDto);
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data,salt);
  }

  async refresh(refreshToken: string) {
    const decodeToken = this.jwtService.decode(refreshToken);
    const user = await this.userService.findOne(decodeToken.id);
    const userRefreshToken = await this.userService.findRefreshToken(decodeToken.id);
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });
    if(!user || !userRefreshToken || userRefreshToken !== refreshToken) {
      await this.logout(refreshToken);
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    const tokens = await this.getTokens(user.id, user.userName,user.profile?.id,user.profile?.profileName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const updateUser = new UpdateUserDto();
    updateUser.refreshToken = refreshToken;
    await this.userService.update(id, updateUser);
  }

  async getTokens(userId: number, username: string,profileId: number,profileName: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          userName: username,
          profileId: profileId,
          profileName: profileName,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '30m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}