import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Response } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

   async create(createPostDto: CreatePostDto,@Res() response: Response) {
    var message = "";
    const post : Post = new Post();
    post.title = createPostDto.title;
    post.created = createPostDto.created;
    post.modified = createPostDto.modified;
    post.likes = createPostDto.likes;

    const profile = await this.profileRepository.findOne({
      where: {
        id: createPostDto.profile
      },
    });
    if(profile != null) {
      post.profile = profile;
      await this.postRepository.save(post);
      return response.status(HttpStatus.OK).send(createPostDto);
    }
    else {
      message += `cant find your profile (id = ${createPostDto.profile})`
    }
    return response.status(HttpStatus.BAD_REQUEST).send(message);
  }

  async findAll() {
    const response = await this.postRepository.find();
    console.log(response);
    return response;
  }

  async findOne(id: number) {
    const response = await this.postRepository.findOneBy({id});
    console.log(response);
    return response;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post : Post = new Post();
    post.id = id;
    post.title = updatePostDto.title;
    post.modified = updatePostDto.modified;
    post.likes = updatePostDto.likes;
    return await this.postRepository.save(post);
  }

  async remove(id: number) {
    return await this.postRepository.delete({id});
  }
}
