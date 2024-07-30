import { Expose, Type } from 'class-transformer';
import { ResponseProfileDto } from 'src/profile/dto/response-profile.dto';
import { Profile } from 'src/profile/entities/profile.entity';

export class ResponsePostDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  created: Date;

  @Expose()
  likes: string;

  @Type(()=>ResponseProfileDto)
  @Expose()
  Profile: Profile;
}