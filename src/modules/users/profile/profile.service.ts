import { Service } from 'typedi';
import { BaseService } from '../../../services/base.service';
import { ProfileRepository } from '../repositories/profile.repository';

@Service()
export default class ProfileService extends BaseService {

  constructor(private readonly profileRepo:ProfileRepository){
    super();
  }
}
