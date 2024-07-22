import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto): Promise<Profile | undefined> {
    const profile : Profile = new Profile();
    profile.profileName = createProfileDto.profileName;
    profile.profileStatus = createProfileDto.profileStatus;
    profile.created = createProfileDto.created;
    profile.modified = createProfileDto.modified;
    return this.profileRepository.save(profile);
  }

  findAll(): Promise<Profile[] | undefined> {
    return this.profileRepository.find();
  }

  findOne(id: number): Promise<Profile | undefined> {
    return this.profileRepository.findOneBy({id});
  }

  update(id: number, updateProfileDto: UpdateProfileDto): Promise<Profile | undefined> {
    const profile : Profile = new Profile();
    profile.id = id;
    profile.profileName = updateProfileDto.profileName;
    profile.profileStatus = updateProfileDto.profileStatus;
    profile.modified = updateProfileDto.modified;
    return this.profileRepository.save(profile);
  }

  remove(id: number): Promise<DeleteResult | undefined> {
    return this.profileRepository.delete({id});
  }
}
