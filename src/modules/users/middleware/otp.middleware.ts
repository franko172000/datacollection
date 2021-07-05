import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import { OTPService } from '../otp/otp.service';

@Service()
export class OTPGuard implements ExpressMiddlewareInterface {
  constructor(private otpService: OTPService) {}

  async use(request: any, response: any, next: (err?: any) => any) {
    const { code } = request.body;
    const { userId } = request.params;

    const otp = await this.otpService.validateOTP(userId, code);
    if (!otp) {
      throw new UnauthorizedError('OTP not found');
    }

    next();
  }
}
