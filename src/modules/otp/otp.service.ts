import { OTPRepository } from './repositories/otp.repository';

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
      userId,
      code,
    });
    return code;
  }

  /**
   * Validates generated OTP
   * @param userId
   * @param code
   * @returns
   */
  async validateOTP(userId: string, code: number) {
    return;
  }
}
