import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
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
    const currentDateTime = new Date();
    profile.profileName = createProfileDto.profileName;
    profile.profileStatus = createProfileDto.profileStatus;
    profile.created = currentDateTime;
    profile.modified = currentDateTime;
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

  async updateWithFile(id: number, file: Express.Multer.File) {
    const profile : Profile = await this.profileRepository.findOneBy({id});
    const currentDateTime = new Date();
    profile.modified = currentDateTime;
    if(file !== undefined) {
      profile.picture = file.buffer;
    }
    const updateProfile = await this.profileRepository.save(profile);
    return instanceToPlain(updateProfile,{ strategy: 'excludeAll'});
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile : Profile = new Profile();
    const currentDateTime = new Date();
    profile.id = id;
    profile.profileName = updateProfileDto.profileName;
    profile.profileStatus = updateProfileDto.profileStatus;
    profile.modified = currentDateTime;
    const updateProfile = await this.profileRepository.save(profile);
    return instanceToPlain(updateProfile,{ strategy: 'excludeAll'});
  }

  async preview(id:number): Promise<StreamableFile> {
    var message = "";
    const profile = await this.profileRepository.findOneBy({id});
    if(profile === null) {
      message += `cant find your profile (id = ${id})`
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    if(profile.picture === null) {
      return null;
    }
    return new StreamableFile(profile.picture);
  }

  remove(id: number): Promise<DeleteResult | undefined> {
    return this.profileRepository.delete({id});
  }
}
