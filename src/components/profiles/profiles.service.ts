import { FindManyOptions, Repository, TypeORMError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PageDTO, PageMetaDTO, QueryEntitiesDTO } from '@/common/dto';
import { ConflictException } from '@/common/exceptions';
import { ProfileFactory } from '@/common/factory';

import { ProfileDTO, CreateProfileDTO, QueryProfilesDTO, UpdateProfileDTO } from './dto';
import { Profile } from './entities';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

  async getProfiles(queryProfilesDTO: QueryProfilesDTO): Promise<PageDTO<ProfileDTO>> {
    const [profiles, itemCount] = await this.profileRepository.findAndCount({
      ...this.getPaginationOptions<Profile>(queryProfilesDTO),
      order: { [queryProfilesDTO.order_by]: queryProfilesDTO.order_type },
    });

    const profilesDTOs = profiles.map((profile) => new ProfileDTO(profile));
    const pageMetaDTO = new PageMetaDTO(queryProfilesDTO.start, queryProfilesDTO.limit, itemCount);

    return new PageDTO(profilesDTOs, pageMetaDTO);
  }

  async getProfile(id: string) {
    const profile = await this.profileRepository.findOneBy({ id });
    return new ProfileDTO(profile);
  }

  async createProfile(userId: string, createProfileDTO: CreateProfileDTO) {
    console.log(createProfileDTO);
    const isExistLogin = await this.profileRepository.exist({ where: { id: createProfileDTO.userId } });
    if (isExistLogin) throw new ConflictException('An profile with this userId exists', Profile.name);

    try {
      const tempProfile = ProfileFactory.fromCreateProfileDTO(createProfileDTO);
      const profile = await this.profileRepository.save(tempProfile);

      return new ProfileDTO(profile);
    } catch (error) {
      if (!(error instanceof TypeORMError)) throw error;
    }
  }

  async updateProfile(id: string, updateProfileDTO: UpdateProfileDTO) {
    await this.profileRepository.update(id, ProfileFactory.fromUpdateProfileDTO(updateProfileDTO));

    return this.getProfile(id);
  }

  async deleteProfile(id: string) {
    await this.profileRepository.delete(id);
  }

  private getPaginationOptions<T>(queryEntitiesDTO: QueryEntitiesDTO) {
    return {
      skip: queryEntitiesDTO.start,
      take: queryEntitiesDTO.limit,
    } as FindManyOptions<T>;
  }
}
