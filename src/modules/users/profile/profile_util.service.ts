import { Service } from 'typedi';
import { ProfileRepository } from '../repositories/profile.repository';
import { IBasicProfile } from '../interfaces';

@Service()
export default class ProfileUtilService {
  constructor(private readonly profileRepo: ProfileRepository) {}

  async createProfile(profile: IBasicProfile) {
    return await this.profileRepo.createProfile(profile);
  }
}
