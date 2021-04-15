import { Body, Controller, Get, Post } from 'routing-controllers';
import { Service } from 'typedi';
import { UserLoginDTO, UserRegisterDTO } from '../dto/auth.dto';
import AuthService from './auth.service';

@Controller('auth/')
@Service()
export default class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Controller method to handle login authentication
   */
  @Post('login')
  async login(@Body() body: UserLoginDTO) {
    return this.authService.login(body);
  }

  /**
   * Controller method for user registration
   */
  @Post('register')
  async register(@Body() body: UserRegisterDTO) {
    return this.authService.registerUser(body);
  }
}
