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

  async findAll() {
    const response = await this.userRepository.createQueryBuilder("user").orderBy({'user.id':'ASC'}).getMany();
    return instanceToPlain(response,{ strategy: 'excludeAll'});
  }

  async findOne(id: number) {
    const response = await this.userRepository.createQueryBuilder("user").where("user.id = :id", { id: id }).getOne();
    return instanceToPlain(response,{strategy: 'excludeAll'});
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
