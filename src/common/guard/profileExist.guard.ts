import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { logger } from '@/utils/logger.util';

import { NotFoundException } from '@/common/exceptions';

import { Profile } from '../../components/profiles/entities';

@Injectable()
export class ProfileExistGuard implements CanActivate {
  constructor(@InjectRepository(Profile) private profileRepository: Repository<Profile>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    logger.debug({ message: 'Start ProfileExistGuard', params: { requestId: request.headers.requestId } });

    const profile = await this.profileRepository.findOneBy({ id: request.params['id'] });

    if (!profile) {
      logger.error({ message: 'Failed ProfileExistGuard', params: { requestId: request.headers.requestId } });
      throw new NotFoundException('profile not found', Profile.name);
    }

    request.profile = profile;

    logger.debug({ message: 'Success ProfileExistGuard', params: { requestId: request.headers.requestId } });

    return true;
  }
}
