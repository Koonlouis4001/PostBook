import { Module } from '@nestjs/common';
import { AuthenService } from './authen.service';
import { AuthenController } from './authen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
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
