import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'web_password',
      username: 'web_owner',
      entities: [Post],
      database: 'web_database',
      synchronize: true,
      logging: true,
    }),
    PostsModule,Post],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
