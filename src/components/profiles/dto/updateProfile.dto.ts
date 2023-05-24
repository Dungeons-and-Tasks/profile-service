import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProfileDTO } from './createProfile.dto';

export class UpdateProfileDTO extends PartialType(OmitType(CreateProfileDTO, ['userId'])) {}
