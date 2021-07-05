import { Service } from 'typedi';
import { ProfileRepository } from '../repositories/profile.repository';
import { IBasicProfile } from '../interfaces';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class ProfileUtilService {
  constructor(@InjectRepository(ProfileRepository) private readonly profileRepo: ProfileRepository) {}

  async createProfile(profile: IBasicProfile) {
    return await this.profileRepo.createProfile(profile);
  }
}
