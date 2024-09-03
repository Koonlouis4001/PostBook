import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, StreamableFile, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from 'src/authen/authen.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @Get('image/:id')
  getFile(@Param('id') id: number): Promise<StreamableFile> {
    return this.profileService.preview(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  updateWithFile(@Param('id') id: number,@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({fileType: 'jpeg',}).addMaxSizeValidator({maxSize: 1000000})
  .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,fileIsRequired: true}),) file: Express.Multer.File) {
    return this.profileService.updateWithFile(id,file);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}
