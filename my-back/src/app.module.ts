import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { ConnectionConfig } from './connection/connection.config';
import { UserModule } from './user/user.module';
import { AuthenModule } from './authen/authen.module';


@Module({
  imports: [
   ConfigModule.forRoot(),
   ConnectionConfig,
   PostsModule, ProfileModule, UserModule, AuthenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
