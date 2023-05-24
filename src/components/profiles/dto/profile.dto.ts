import { Profile } from '../entities';

export class ProfileDTO {
  id: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(profile: Profile) {
    this.id = profile.id;
    this.nickname = profile.nickname;
    this.createdAt = profile.createdAt;
    this.updatedAt = profile.updatedAt;
  }
}
