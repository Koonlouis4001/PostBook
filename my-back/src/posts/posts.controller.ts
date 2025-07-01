import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, StreamableFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../authen/authen.guard';
import { FileInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PaginationPostDto } from './dto/pagination-post.dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('upload/:profileId')
  @UseInterceptors(FileInterceptor('file'))
  createWithFile(@Param('profileId') profileId: number,@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({fileType: 'jpeg',}).addMaxSizeValidator({maxSize: 1000000})
  .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,fileIsRequired: false}),) file: Express.Multer.File,@Body() createPostDto: CreatePostDto) {
    return this.postsService.createWithFile(profileId,file,createPostDto);
  }

  @Get('image/:id')
  getFile(@Param('id') id: number): Promise<StreamableFile> {
    return this.postsService.preview(id);
  }

  @Get('profile/:profileId')
  findFromProfileId(@Param('profileId') profileId: number) {
    return this.postsService.findFromProfile(profileId);
  }

  @Post('pagination/profile/:profileId')
  findPaginationFromProfileId(@Param('profileId') profileId: number,@Body() paginationPostDto: PaginationPostDto) {
    return this.postsService.findPaginationFromProfile(profileId,paginationPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post('pagination')
  findPaginationAll(@Body() paginationPostDto: PaginationPostDto) {
    return this.postsService.findPaginationAll(paginationPostDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
