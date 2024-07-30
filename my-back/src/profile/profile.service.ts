import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseProfileDto } from './dto/response-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<ResponseProfileDto | undefined> {
    const profile : Profile = new Profile();
    profile.profileName = createProfileDto.profileName;
    profile.profileStatus = createProfileDto.profileStatus;
    profile.created = createProfileDto.created;
    profile.modified = createProfileDto.modified;
    const createProfile = await this.profileRepository.save(profile);
    return plainToInstance(ResponseProfileDto,createProfile);
  }

  async findAll(): Promise<ResponseProfileDto[] | undefined> {
    const profiles = await this.profileRepository.find();
    return plainToInstance(ResponseProfileDto,profiles);
  }

  async findOne(id: number): Promise<ResponseProfileDto | undefined> {
    const profile = await this.profileRepository.findOneBy({id});
    return plainToInstance(ResponseProfileDto,profile);
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ResponseProfileDto | undefined> {
    const profile : Profile = new Profile();
    profile.id = id;
    profile.profileName = updateProfileDto.profileName;
    profile.profileStatus = updateProfileDto.profileStatus;
    profile.modified = updateProfileDto.modified;
    const updateProfile = await this.profileRepository.save(profile);
    return plainToInstance(ResponseProfileDto,updateProfile);
  }

  remove(id: number): Promise<DeleteResult | undefined> {
    return this.profileRepository.delete({id});
  }
}
