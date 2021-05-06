import { Service } from 'typedi';
import { OTPRepository } from '../repositories/otp.repository';

@Service()
export class OTPService {
  constructor(private readonly otpRepo: OTPRepository) {}

  /**
   * Method to generate One-time-password
   * @param userId string
   * @returns number
   */
  async generateOTP(userId: string) {
    //generate 6 random numbers
    const code = Math.floor(100000 + Math.random() * 900000);
    //add number to database
    await this.otpRepo.createOTP({
      user_id: userId,
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
      //this.otpRepo.deleteOTP(otp.id);
      return true;
    }
  }
}
