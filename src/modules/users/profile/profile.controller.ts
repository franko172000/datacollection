import { Body, Controller, Get, Patch, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { UserRegisterDTO } from '../dto/auth.dto';
import ProfileService from './profile.service';

@Controller('user/')
@Service()
export default class AuthController {
  constructor(private profileService: ProfileService) {}

  /**
   * Controller method to handle login authentication
   */
  @Get('profile')
  async login() {
    return { message: 'this is login' };
  }

  /**
   * Controller method for user registration
   */
  @Patch('profile')
  async register(@Body() body: UserRegisterDTO) {}
}
