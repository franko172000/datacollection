import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { OTPRepository } from '../repositories/otp.repository';

@Service()
export class OTPService {
  constructor(@InjectRepository(OTPRepository) private readonly otpRepo: OTPRepository) {}

  /**
   * Method to generate One-time-password
   * @param userId string
   * @returns number
   */
  async generateOTP(userId: string): Promise<number> {
    //generate 6 random numbers
    const code = Math.floor(100000 + Math.random() * 900000);
    //add number to database
    await this.otpRepo.createOTP({
      userId,
      code,
    });
    return code;
  }

  /**
   * Validates generated OTP
   * @param userId
   * @param code
   * @returns boolean
   */

  async validateOTP(userId: string, code: number) {
    const otp = await this.otpRepo.getOTP(code, userId);
    if (otp) {
      await this.otpRepo.deleteOTP(otp.id);
      return true;
    }
    return false;
  }
}
