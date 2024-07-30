import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Response } from 'express';
import { ResponsePostDto } from './dto/response-post.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

   async create(createPostDto: CreatePostDto,@Res() response: Response): Promise<ResponsePostDto | undefined> {
    var message = "";
    const post = new Post();
    post.title = createPostDto.title;
    post.created = createPostDto.created;
    post.modified = createPostDto.modified;
    post.likes = createPostDto.likes;

    const profile = await this.profileRepository.findOne({
      where: {
        id: createPostDto.profile
      },
    });
    console.log(profile);
    if(profile != null) {
      post.profile = profile;
      const createPost = await this.postRepository.save(post);
      return plainToInstance(ResponsePostDto,createPost);
    }
    else {
      message += `cant find your profile (id = ${createPostDto.profile})`
    }
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const response = await this.postRepository.find();
    return plainToInstance(ResponsePostDto,response);
  }

  async findOne(id: number) {
    const response = await this.postRepository.findOneBy({id});
    return plainToInstance(ResponsePostDto,response);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post : Post = new Post();
    post.id = id;
    post.title = updatePostDto.title;
    post.modified = updatePostDto.modified;
    post.likes = updatePostDto.likes;
    const updatePost = await this.postRepository.save(post);
    return plainToInstance(ResponsePostDto,updatePost);
  }

  async remove(id: number) {
    return await this.postRepository.delete({id});
  }
}
