import { UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../../services/base.service';
import { UserRegisterDTO, UserLoginDTO } from '../dto/auth.dto';
import { UsersRepository } from '../repositories/users.repository';
import ProfileUtilService from '../profile/profile_util.service';
import * as bcrypt from 'bcrypt';
import MessageBrooker from '../../../brooker/message_brooker';
import config from '../../../config';
import { sign } from 'jsonwebtoken';
import { OTPService } from '../../otp/otp.service';

@Service()
export default class AuthService extends BaseService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly profileUtil: ProfileUtilService,
    private readonly msgBrooker: MessageBrooker,
    private readonly otpService: OTPService,
  ) {
    super();
  }

  /**
   * Login handler
   * @param data login data
   * @returns object
   */
  async login(data: UserLoginDTO) {
    const { email, password } = data;

    //get user info
    const user = await this.userRepo.getUserByEmail(email);

    //check if user exists
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    //compare password
    const passwordCheck = await bcrypt.compare(password, user.password);

    //check if password match
    if (!passwordCheck) {
      throw new UnauthorizedError('Invalid credentials');
    }

    //sign JWT token
    const token = sign(
      {
        data: { email: user.email, id: user.id },
      },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    return this.okResponse('Login valid', { token });
  }

  /**
   * User registration handler
   * @param user user registration data
   * @returns
   */
  async registerUser(user: UserRegisterDTO) {
    //destruct user object
    let { firstName, lastName, email, password } = user;
    //encrypt password
    password = bcrypt.hashSync(password, 10);
    //create user record
    const userObj = await this.userRepo.createUser({ email, password });

    //create profile
    await this.profileUtil.createProfile({
      user_id: userObj.id,
      firstName,
      lastName,
    });

    //generate otp
    const OTP = await this.otpService.generateOTP(userObj.id);

    //send confirmation email
    this.msgBrooker.sendMessage(
      config.brookerChannels.email.auth.confirmation,
      JSON.stringify({ firstName, lastName, email, OTP }),
    );

    return this.okResponse('User created!');
  }

  async confirmEmail() {
    //1. check geneeated token
  }

  async forgotPassword() {}

  async resetPassword() {}
}
