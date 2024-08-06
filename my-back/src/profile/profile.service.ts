import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const profile : Profile = new Profile();
    profile.profileName = createProfileDto.profileName;
    profile.profileStatus = createProfileDto.profileStatus;
    profile.created = createProfileDto.created;
    profile.modified = createProfileDto.modified;
    const createProfile = await this.profileRepository.save(profile);
    return instanceToPlain(createProfile,{ strategy: 'excludeAll'});
  }

  async findAll() {
    const profiles = await this.profileRepository.createQueryBuilder().orderBy({'Profile.id':'ASC'}).getMany();
    return instanceToPlain(profiles,{ strategy: 'excludeAll'});
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOneBy({id});
    return instanceToPlain(profile,{ strategy: 'excludeAll'});
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile : Profile = new Profile();
    profile.id = id;
    profile.profileName = updateProfileDto.profileName;
    profile.profileStatus = updateProfileDto.profileStatus;
    profile.modified = updateProfileDto.modified;
    const updateProfile = await this.profileRepository.save(profile);
    return instanceToPlain(updateProfile,{ strategy: 'excludeAll'});
  }

  remove(id: number): Promise<DeleteResult | undefined> {
    return this.profileRepository.delete({id});
  }
}
