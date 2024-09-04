import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const currentDateTime = new Date();
    user.userName = createUserDto.userName;
    user.password = createUserDto.password;
    user.created = currentDateTime;
    user.modified = currentDateTime;
    user.refreshToken = null;
    user.profile = null;
    return await this.userRepository.save(user);
  }

  async findAll() {
    const response = await this.userRepository.createQueryBuilder("user").orderBy({'user.id':'ASC'}).getMany();
    return instanceToPlain(response,{ strategy: 'excludeAll'});
  }

  async findRefreshToken(id: number) {
    const user = await this.userRepository.findOneBy({id});
    return user.refreshToken;
  }

  async findByUsername(userName: string) {
    return await this.userRepository.createQueryBuilder("user").leftJoinAndSelect("user.profile","profile").where("user.userName = :userName", { userName: userName }).getOne();
  }

  async findWithRefreshToken(refreshToken: string) {
    const user = await this.userRepository.createQueryBuilder("user").leftJoinAndSelect("user.profile","profile").where("user.refreshToken = :refreshToken", { refreshToken: refreshToken }).getOne();
    return user
  }

  async findOne(id: number) {
    const response = await this.userRepository.createQueryBuilder("user").leftJoinAndSelect("user.profile","profile").where("user.id = :id", { id: id }).getOne();
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id})
    user.password = updateUserDto.password;
    user.refreshToken = updateUserDto.refreshToken;
    user.modified = updateUserDto.modified;
    user.profile = updateUserDto.profile;
    const updateUser = await this.userRepository.save(user);
    return instanceToPlain(updateUser,{ strategy: 'excludeAll'});
  }

  async remove(id: number) {
    return await this.userRepository.delete({id});
  }
}
