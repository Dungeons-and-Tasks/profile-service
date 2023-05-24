import { CreateProfileDTO, UpdateProfileDTO } from '../../components/profiles/dto';
import { Profile } from '../../components/profiles/entities';

export abstract class ProfileFactory {
  static fromCreateProfileDTO(createAccountDTO?: CreateProfileDTO) {
    const { nickname, userId } = createAccountDTO;
    const profile = new Profile();

    profile.id = userId;
    profile.nickname = nickname;

    return profile;
  }

  static fromUpdateProfileDTO(updateAccountDTO: UpdateProfileDTO) {
    const { nickname } = updateAccountDTO;
    const profile = new Profile();

    profile.nickname = nickname;

    return profile;
  }
}
