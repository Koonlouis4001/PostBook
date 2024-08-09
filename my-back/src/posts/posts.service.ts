import { HttpException, HttpStatus, Injectable, Res, StreamableFile } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

   async create(createPostDto: CreatePostDto) {
    var message = "";
    const post = new Post();
    post.title = createPostDto.title;
    post.created = createPostDto.created;
    post.modified = createPostDto.modified;
    post.likes = createPostDto.likes;

    const profile = await this.profileRepository.findOne({
      where: {
        id: createPostDto.profile
      }
    });
    if(profile != null) {
      post.profile = profile;
      const createPost = await this.postRepository.save(post);
      return instanceToPlain(createPost,{ strategy: 'excludeAll',});
    }
    else {
      message += `cant find your profile (id = ${createPostDto.profile})`
    }
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  async findAll() {
    const response = await this.postRepository.createQueryBuilder("post").leftJoinAndSelect("post.profile","profile").orderBy({'Post.id':'ASC'}).getMany();
    return instanceToPlain(response,{ strategy: 'excludeAll'});
  }

  async findOne(id: number) {
    const response = await this.postRepository.createQueryBuilder("post").leftJoinAndSelect("post.profile","profile").where("post.id = :id", { id: id }).getOne();
    return instanceToPlain(response,{strategy: 'excludeAll'});
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({id});
    post.title = updatePostDto.title;
    post.modified = updatePostDto.modified;
    post.likes = updatePostDto.likes;
    const updatePost = await this.postRepository.save(post);
    return instanceToPlain(updatePost,{ strategy: 'excludeAll'});
  }

  async upload(id:number,file: Express.Multer.File) {
    const post = await this.postRepository.findOneBy({id});
    post.picture = file.buffer;
    const updatePost = await this.postRepository.save(post);
    return instanceToPlain(updatePost,{ strategy: 'excludeAll'});
  }

  async preview(id:number): Promise<StreamableFile> {
    var message = "";
    const post = await this.postRepository.findOneBy({id});
    if(post === null) {
      message += `cant find your post (id = ${id})`
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    if(post.picture === null) {
      message += `cant find your post picture (id = ${id})`
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    return new StreamableFile(post.picture);
  }

  async remove(id: number) {
    return await this.postRepository.delete({id});
  }
}
