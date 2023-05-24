import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './createProfile.dto';

export class UpdateProfileDto extends PartialType(OmitType(CreateProfileDto, ['userId'])) {}
