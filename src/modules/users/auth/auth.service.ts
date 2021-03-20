import { NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../../services/base.service';
import { UserRegisterDTO } from '../dto/auth.dto';
import { UsersRepository } from '../repositories/users.repository';
import ProfileUtilService  from '../profile/profile_util.service';
import * as bcrypt from 'bcrypt';

@Service()
export default class AuthService extends BaseService {

  constructor(private readonly userRepo:UsersRepository, private readonly profileUtil: ProfileUtilService){
    super();
  }

  async login() {}

  async registerUser(user: UserRegisterDTO) {
    //destruct user object
    let {firstName,lastName,email,password} = user;
    //encrypt password
    password = bcrypt.hashSync(password, 10);
    //create user record
    const userObj = await this.userRepo.createUser({email,password})
    
    //create profile
    this.profileUtil.createProfile({
      user_id: userObj.id,
      firstName,
      lastName
    })

    //TODO: 6. Trigger an event to Send confirmation mail
    //TODO: 7. Return response to user
    return this.okResponse("This is a test response")
  }
}
