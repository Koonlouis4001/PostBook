import { HttpException, HttpStatus, Injectable, Res, StreamableFile } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/posts.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationPostDto } from './dto/pagination-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  async createWithFile(profileId: number,file: Express.Multer.File,createPostDto: CreatePostDto) {
    var message = "";
    const currentDateTime = new Date();
    const post = new Post();
    post.title = createPostDto.title;
    post.created = currentDateTime;
    post.modified = currentDateTime;
    post.likes = 0;
    if(file !== undefined) {
      post.picture = file.buffer;
    }
    const profile = await this.profileRepository.findOne({
      where: {
        id: profileId
      }
    });
    if(profile != null) {
      post.profile = profile;
      const createPost = await this.postRepository.save(post);
      return instanceToPlain(createPost,{ strategy: 'excludeAll',});
    }
    else {
      message += `cant find your profile (id = ${profileId})`
    }
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }

  async findFromProfile(profileId: number){
    const response = await this.postRepository.createQueryBuilder("posts").where("posts.profile = :profileId", { profileId: profileId }).getMany();
    return instanceToPlain(response);
  }

  async findPaginationFromProfile(profileId: number,paginationPostDto: PaginationPostDto){
    const response = await this.postRepository.createQueryBuilder("posts").where("posts.profile = :profileId", { profileId: profileId }).skip(10 * (paginationPostDto.page - 1)).take(paginationPostDto.row).orderBy({'posts.id':'ASC'}).getMany();
    return instanceToPlain(response);
  }

  async findAll() {
    const response = await this.postRepository.createQueryBuilder("posts").leftJoinAndSelect("posts.profile","profile").orderBy({'posts.id':'ASC'}).getMany();
    return instanceToPlain(response,{ strategy: 'excludeAll'});
  }

  async findPaginationAll(paginationPostDto: PaginationPostDto) {
    const response = await this.postRepository.createQueryBuilder("posts").leftJoinAndSelect("posts.profile","profile").skip(10 * (paginationPostDto.page - 1)).take(paginationPostDto.row).orderBy({'posts.id':'ASC'}).getMany();
    return instanceToPlain(response,{ strategy: 'excludeAll'});
  }

  async findOne(id: number) {
    const response = await this.postRepository.createQueryBuilder("posts").leftJoinAndSelect("posts.profile","profile").where("posts.id = :id", { id: id }).getOne();
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
      return null;
    }
    return new StreamableFile(post.picture);
  }

  async remove(id: number) {
    return await this.postRepository.delete({id});
  }
}
