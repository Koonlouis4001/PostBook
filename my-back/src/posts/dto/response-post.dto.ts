import { Expose, Type } from 'class-transformer';
import { ResponseProfileDto } from '../../profile/dto/response-profile.dto';

export class ResponsePostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  created: Date;

  @Expose()
  likes: string;

  @Type(() => ResponseProfileDto)
  @Expose()
  Profile: ResponseProfileDto;
}