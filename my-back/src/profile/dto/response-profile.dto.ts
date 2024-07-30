import { Expose } from 'class-transformer';

export class ResponseProfileDto {
  @Expose()
  id: number;

  @Expose()
  profileName: string;

  @Expose()
  profileStatus: string;
}