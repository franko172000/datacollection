import { NotFoundError, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../../services/base.service';
import { UserRegisterDTO, UserLoginDTO, OtpDTO, ResetPasswordDTO } from '../dto/auth.dto';
import { UsersRepository } from '../repositories/users.repository';
import ProfileUtilService from '../profile/profile_util.service';
import * as bcrypt from 'bcrypt';
import MessageBrooker from '../../../brooker/message_brooker';
import config from '../../../config';
import { sign } from 'jsonwebtoken';
import { OTPService } from '../otp/otp.service';

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
    const { firstName, lastName, email } = user;
    let { password } = user;
    //encrypt password
    password = bcrypt.hashSync(password, 10);
    //create user record
    const userObj = await this.userRepo.createUser({ email, password });

    const userId = userObj.id;
    //create profile
    await this.profileUtil.createProfile({
      user_id: userId,
      firstName,
      lastName,
    });

    //generate otp
    const otp = await this.otpService.generateOTP(userId);

    //send confirmation email
    this.msgBrooker.sendMessage(
      config.brookerChannels.email.auth.confirmation,
      JSON.stringify({ firstName, lastName, email, otp }),
    );

    return this.okResponse('User created!');
  }

  /**
   * Validate OTP
   * @param data request body
   * @returns JSON
   */
  async validateOTP(data: OtpDTO) {
    //1. check geneeated tokenk
    const { userId, code } = data;

    //check if otp is valid
    await this.checkOTP(userId, code);

    return this.okResponse('OTP validated');
  }

  /**
   * Validates OPT and activates user account
   * @param data request body
   */
  async confirmEmail(data: OtpDTO) {
    const { userId, code } = data;

    //check if otp is valid
    await this.checkOTP(userId, code);

    //activate acount
    const userData = this.userRepo.activateAccount(userId);
    if (!userData) {
      throw new NotFoundError('User not found');
    }

    return this.okResponse('Account activated');
  }

  /**
   * Send forget password email with OTP
   * @param email
   * @returns JSON
   */
  async forgotPassword(email: string) {
    const data = this.userRepo.getUserByEmail(email);

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
    //validate OTP
    await this.checkOTP(userId, data.code);
    //encrypt password
    const password = bcrypt.hashSync(data.password, 10);
    //update account
    const userData = await this.userRepo.updateAccount({ password }, userId);

    if (!userData) {
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
  async updateUserPassword(password: string, userId: string){
    //update account
    const userData = await this.userRepo.updateAccount({ password }, userId);

    if (!userData) {
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

  /**
   * validate OTP
   * @param userId
   * @param code
   */
  private async checkOTP(userId: string, code: number) {
    const otp = await this.otpService.validateOTP(userId, code);
    if (!otp) {
      throw new UnauthorizedError('OTP not found');
    }
  }
}
