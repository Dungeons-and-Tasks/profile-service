import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { CreateProfileDto, QueryProfilesDto, UpdateProfileDto } from './dto';
import { ProfilesService } from './profiles.service';

import { logger } from '@/utils/logger.util';

import { AuthGuard, ProfileExistGuard } from '@/common/guard';
import { Request } from '@/common/interfaces';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getProfiles(@Req() request: Request, @Query() queryProfilesDTO: QueryProfilesDto) {
    logger.debug({ message: 'Start getProfiles request', params: { requestId: request.headers.requestId } });

    try {
      const response = this.profilesService.getProfiles(queryProfilesDTO);

      logger.debug({ message: 'Success getProfiles request', params: { requestId: request.headers.requestId } });

      return response;
    } catch (error) {
      logger.error({ message: 'Failed getProfiles request', params: { requestId: request.headers.requestId }, error });
      return false;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard, ProfileExistGuard)
  async getProfile(@Req() request: Request, @Param('id') id: string) {
    logger.debug({ message: 'Start getProfile request', params: { requestId: request.headers.requestId } });

    try {
      const response = this.profilesService.getProfile(id);

      logger.debug({ message: 'Success getProfile request', params: { requestId: request.headers.requestId } });

      return response;
    } catch (error) {
      logger.error({ message: 'Failed getProfile request', params: { requestId: request.headers.requestId }, error });
      return false;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProfile(@Req() request: Request, @Body() createProfileDTO: CreateProfileDto) {
    logger.debug({ message: 'Start createProfile request', params: { requestId: request.headers.requestId } });

    try {
      const response = this.profilesService.createProfile(request.userId, createProfileDTO);

      logger.debug({ message: 'Success createProfile request', params: { requestId: request.headers.requestId } });

      return response;
    } catch (error) {
      logger.error({ message: 'Failed createProfile request', params: { requestId: request.headers.requestId }, error });
      return false;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, ProfileExistGuard)
  async updateProfile(@Req() request: Request, @Param('id') id: string, @Body() updateProfileDTO: UpdateProfileDto) {
    logger.debug({ message: 'Start updateProfile request', params: { requestId: request.headers.requestId } });

    try {
      const response = await this.profilesService.updateProfile(id, updateProfileDTO);

      logger.debug({ message: 'Success updateProfile request', params: { requestId: request.headers.requestId } });

      return response;
    } catch (error) {
      logger.error({ message: 'Failed updateProfile request', params: { requestId: request.headers.requestId }, error });
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard, ProfileExistGuard)
  async deleteProfile(@Req() request: Request, @Param('id') id: string) {
    logger.debug({ message: 'Start deleteProfile request', params: { requestId: request.headers.requestId } });

    try {
      await this.profilesService.deleteProfile(id);

      logger.debug({ message: 'Success deleteProfile request', params: { requestId: request.headers.requestId } });

      return true;
    } catch (error) {
      logger.error({ message: 'Failed deleteProfile request', params: { requestId: request.headers.requestId }, error });
      return false;
    }
  }
}
