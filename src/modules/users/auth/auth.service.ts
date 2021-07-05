import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../../services/base.service';
import { UserRegisterDTO, UserLoginDTO, ResetPasswordDTO } from '../dto/auth.dto';
import { UsersRepository } from '../repositories/users.repository';
import ProfileUtilService from '../profile/profile_util.service';
import * as bcrypt from 'bcrypt';
import MessageBrooker from '../../../brooker/message_brooker';
import config from '../../../config';
import { sign } from 'jsonwebtoken';
import { OTPService } from '../otp/otp.service';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class AuthService extends BaseService {
  constructor(
    @InjectRepository(UsersRepository) private readonly userRepo: UsersRepository,
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
    const token = this.generateToken(user.id, user.email);

    return this.okResponse('Login valid', { token });
  }

  /**
   * User registration handler
   * @param user user registration data
   * @returns
   */
  async registerUser(user: UserRegisterDTO) {
    //destruct user object
    const { firstName, lastName, email, companyName, password } = user;
    //create user record
    const userObj = await this.userRepo.createUser({ email, password });

    const userId = userObj.id;
    //create profile
    await this.profileUtil.createProfile({
      userId,
      firstName,
      lastName,
      companyName,
    });

    //generate otp
    const otp = await this.otpService.generateOTP(userId);

    //sign JWT token
    const token = this.generateToken(userId, email);

    //send confirmation email
    this.msgBrooker.sendMessage(
      config.brookerChannels.email.auth.confirmation,
      JSON.stringify({ firstName, lastName, email, otp }),
    );

    return this.okResponse('User created!', { token });
  }

  /**
   * Generate token
   * @param email user email
   * @returns object
   */
  async generateUserToken(email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const token = this.generateToken(user.id, email);

    return this.okResponse('Generated Token', { token });
  }

  /**
   * Validate OTP
   * @param data request body
   * @returns JSON
   */
  async validateOTP() {
    // //1. check geneeated tokenk
    // const { code } = data;

    // //check if otp is valid
    // await this.checkOTP(userId, code);
    return this.okResponse('OTP validated');
  }

  /**
   * Validates OPT and activates user account
   * @param data request body
   */
  async confirmEmail(userId: string) {
    //get user info
    const userData = await this.userRepo.getUserById(userId);

    if (!userData) {
      throw new NotFoundError('User not found');
    }

    //activate acount
    await this.userRepo.activateAccount(userId);

    //send welcome email
    this.msgBrooker.sendMessage(
      config.brookerChannels.email.auth.welcome,
      JSON.stringify({
        firstName: userData.profile.firstName,
        lastName: userData.profile.lastName,
        email: userData.email,
      }),
    );

    return this.okResponse('Account activated');
  }

  /**
   * Send forget password email with OTP
   * @param email
   * @returns JSON
   */
  async forgotPassword(email: string) {
    const data = await this.userRepo.getUserByEmail(email);

    if (!data) {
      throw new NotFoundError('User not found');
    }

    //generate otp
    const otp = await this.otpService.generateOTP(data.id);

    //generate token
    const token = this.generateToken(data.id, data.email);
    //send pasword reset email
    this.msgBrooker.sendMessage(
      config.brookerChannels.email.auth.passwordReset,
      JSON.stringify({
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        email: data.email,
        otp,
      }),
    );

    return this.okResponse('Password reset email sent', { token });
  }

  /**
   * Update user password via OTP
   * @param data
   * @param userId
   * @returns JSON
   */
  async resetPassword(data: ResetPasswordDTO, userId: string) {
    //encrypt password
    const password = bcrypt.hashSync(data.password, 10);
    //update account
    const result = await this.userRepo.updateAccount({ password }, userId);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('User not found');
    }

    return this.okResponse('Password updated');
  }

  /**
   * Update user password
   * @param password
   * @param userId
   * @returns JSON
   */
  async updateUserPassword(password: string, userId: string) {
    //encrypt password
    password = bcrypt.hashSync(password, 10);
    //update account
    const result = await this.userRepo.updateAccount({ password }, userId);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('User not found');
    }

    return this.okResponse('Password updated');
  }

  /**
   * Generate JWT token
   * @param userId user id
   * @param email user email
   * @returns string
   */
  private generateToken(userId: string, email: string, duration?: string) {
    return sign(
      {
        data: { email, id: userId },
      },
      config.jwtSecret,
      { expiresIn: duration ?? '1h' },
    );
  }
}
