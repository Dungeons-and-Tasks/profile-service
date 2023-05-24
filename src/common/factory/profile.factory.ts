import { CreateProfileDto, UpdateProfileDto } from '../../components/profiles/dto';
import { Profile } from '../../components/profiles/entities';

export abstract class ProfileFactory {
  static fromCreateProfileDTO(createAccountDTO?: CreateProfileDto) {
    const { nickname, userId } = createAccountDTO;
    const profile = new Profile();

    profile.id = userId;
    profile.nickname = nickname;

    return profile;
  }

  static fromUpdateProfileDTO(updateAccountDTO: UpdateProfileDto) {
    const { nickname } = updateAccountDTO;
    const profile = new Profile();

    profile.nickname = nickname;

    return profile;
  }
}
