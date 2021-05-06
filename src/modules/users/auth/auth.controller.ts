import { Body, Controller, Get, Params, Patch, Post, Req, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { getUserIdFromRequest } from '../../../helper/request.helper';
import {
  UserLoginDTO,
  UserRegisterDTO,
  OtpDTO,
  ResetPasswordDTO,
  updatePasswordDTO,
  tokenDTO,
  forgotPasswordDTO,
} from '../dto/auth.dto';
import { AuthGuard } from '../middleware/auth.middleware';
import AuthService from './auth.service';

@Controller('auth/')
@Service()
export default class AuthController {
  /**
   * Auth constructor
   * @param authService AuthService
   */
  constructor(private authService: AuthService) {}

  /**
   *  handle login authentication
   * @param body request body
   * @returns json
   */
  @Post('login')
  async login(@Body() body: UserLoginDTO) {
    return this.authService.login(body);
  }

  /**
   * Controller method for user registration
   * @param body request body
   * @returns json
   */
  @Post('register')
  async register(@Body() body: UserRegisterDTO) {
    return await this.authService.registerUser(body);
  }

  /**
   * Validate OTP
   * @param body request body
   * @returns json
   */
  @Post('validate-otp')
  @UseBefore(AuthGuard)
  async validateOTP(@Body() body: OtpDTO, @Req() req: any) {
    return await this.authService.validateOTP(body, getUserIdFromRequest(req));
  }

  /**
   * Reset password
   * @param body
   * @param req
   * @returns
   */
  @Patch('reset-password')
  @UseBefore(AuthGuard)
  async resetPassword(@Body() body: ResetPasswordDTO, @Req() req: any) {
    return await this.authService.resetPassword(body, getUserIdFromRequest(req));
  }

  /**
   * Update logged in user password
   * @param body
   * @param req
   * @returns JSON
   */
  @Patch('update-password')
  @UseBefore(AuthGuard)
  async updateUserPassword(@Body() body: updatePasswordDTO, @Req() req: any) {
    return await this.authService.updateUserPassword(body.password, getUserIdFromRequest(req));
  }

  /**
   * Activate user account
   * @param body
   * @returns JSON
   */
  @Patch('confirm-email')
  @UseBefore(AuthGuard)
  async activateAccount(@Body() body: OtpDTO, @Req() req: any) {
    return await this.authService.confirmEmail(body, getUserIdFromRequest(req));
  }

  /**
   * Get token
   * @param body
   * @returns JSON
   */
  @Get('token/:email')
  async getToken(@Params() param: tokenDTO) {
    return await this.authService.generateUserToken(param.email);
  }

  /**
   * Get token
   * @param body
   * @returns JSON
   */
  @Post('forgot-password')
  async forgotPassword(@Body() body: forgotPasswordDTO) {
    return await this.authService.forgotPassword(body.email);
  }
}
