import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { Authen } from './entities/authen.entity';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: '15m' },
  }),
    TypeOrmModule.forFeature([Authen]),
    UserModule,
    ConfigModule],
  controllers: [AuthenController],
  providers: [AuthenService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthenModule {}
