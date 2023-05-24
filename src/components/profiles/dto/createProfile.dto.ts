import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsUUID(4)
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;
}
