import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, HttpStatus, ParseFilePipeBuilder, StreamableFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/authen/authen.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('id') id: number,@UploadedFile(new ParseFilePipeBuilder().addFileTypeValidator({fileType: 'jpeg',}).addMaxSizeValidator({maxSize: 1000000})
  .build({errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}),) file: Express.Multer.File) {
    return this.postsService.upload(id,file);
  }

  @Get('image/:id')
  getFile(@Param('id') id: number): Promise<StreamableFile> {
    return this.postsService.preview(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }
}
