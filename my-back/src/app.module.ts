import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5433,
      username: "web_owner",
      password: "P@ssw0rd",
      database: "web_database",
      synchronize: true,
      entities: [Post]
    })
    ,PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
