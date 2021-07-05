import { NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../../services/base.service';
import { UpdateProfileDTO } from '../dto/profile.dto';
import { ProfileRepository } from '../repositories/profile.repository';

@Service()
export default class ProfileService extends BaseService {
  constructor(@InjectRepository(ProfileRepository) private readonly profileRepo: ProfileRepository) {
    super();
  }

  async getProfile(userId: string) {
    const data = await this.profileRepo.getProfile(userId);
    if (!data) {
      throw new NotFoundError('User not found');
    }

    return this.okResponse('user data', data);
  }

  async updateProfile(userId: string, body: UpdateProfileDTO) {
    const data = await this.profileRepo.updateProfile(userId, body);

    if (data.raw.affectedRows === 0) {
      throw new NotFoundError('User not found');
    }

    return this.okResponse('Profile updated');
  }
}
