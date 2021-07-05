import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateProfileDTO } from '../dto/profile.dto';
import { UsersProfile } from '../entities/users_profile.entity';
import { IBasicProfile, IUpdateProfile } from '../interfaces';

@Service()
@EntityRepository(UsersProfile)
export class ProfileRepository extends Repository<UsersProfile> {
  async createProfile(data: IBasicProfile) {
    return this.save(data);
  }

  async updateProfile(userId: string, data: UpdateProfileDTO) {
    return this.update({ userId }, data);
  }

  async getProfile(userId: string) {
    return this.findOne({ userId });
  }
}
