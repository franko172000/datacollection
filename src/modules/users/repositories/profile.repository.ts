import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { UsersProfile } from '../entities/users_profile.entity';
import { IBasicProfile, IUpdateProfile } from '../interfaces';

@Service()
export class ProfileRepository extends BaseRepository {
  constructor() {
    super(UsersProfile);
  }

  async createProfile(data: IBasicProfile) {
    return await this.getRepo().save(data);
  }

  async updateProfile(user_id: string, data: IUpdateProfile) {
    return await this.getRepo().update({ user_id }, data);
  }
}
