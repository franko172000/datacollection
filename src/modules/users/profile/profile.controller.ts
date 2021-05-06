import { Body, Controller, Get, Patch, Post, Req, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { getUserIdFromRequest } from '../../../helper/request.helper';
import { UpdateProfileDTO } from '../dto/profile.dto';
import { IUpdateProfile } from '../interfaces';
import { AuthGuard } from '../middleware/auth.middleware';
import ProfileService from './profile.service';

@Controller('user/')
@UseBefore(AuthGuard)
@Service()
export default class AuthController {
  constructor(private profileService: ProfileService) {}

  /**
   * Controller method to handle login authentication
   */
  @Get('profile')
  async getPorfile(@Req() req: any) {
    return this.profileService.getProfile(getUserIdFromRequest(req));
  }

  /**
   * Controller method for user registration
   */
  @Patch('profile')
  async updateProfile(@Body() body: UpdateProfileDTO, @Req() req: any) {
    return this.profileService.updateProfile(getUserIdFromRequest(req), body);
  }
}
