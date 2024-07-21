import { Injectable} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly userRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post : Post = new Post();
    post.title = createPostDto.title;
    post.created = createPostDto.created;
    post.modified = createPostDto.modified;
    post.likes = createPostDto.likes;
    return this.userRepository.save(post);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post : Post = new Post();
    post.id = id;
    post.title = updatePostDto.title;
    post.modified = updatePostDto.modified;
    post.likes = updatePostDto.likes;
    return this.userRepository.save(post);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
