import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProfileDTO {
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
