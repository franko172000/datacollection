import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { UpdateProfileDTO } from '../dto/profile.dto';
import { UsersProfile } from '../entities/users_profile.entity';
import { IBasicProfile, IUpdateProfile } from '../interfaces';

@Service()
export class ProfileRepository extends BaseRepository {
  constructor() {
    super(UsersProfile);
  }

  async createProfile(data: IBasicProfile) {
    return this.getRepo().save(data);
  }

  async updateProfile(userId: string, data: UpdateProfileDTO) {
    return this.getRepo().update({ userId }, data);
  }

  async getProfile(userId: string) {
    return this.getRepo().findOne({ userId });
  }
}
