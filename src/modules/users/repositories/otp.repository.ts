import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { OTP } from '../entities/otp.entity';
import { Iotp } from '../interfaces';

@Service()
@EntityRepository(OTP)
export class OTPRepository extends Repository<OTP> {
  /**
   * Create OTP
   * @param Iotp data OTP interface
   * @returns promise
   */
  async createOTP(data: Iotp) {
    return this.save(data);
  }

  /**
   *
   * @param string code
   * @param string userId
   * @returns promise
   */
  async getOTP(code: number, userId: string) {
    return this.findOne({ where: { code, userId } });
  }

  /**
   * Delete OTP from database
   * @param id number
   */
  async deleteOTP(id: number) {
    return this.delete({ id });
  }
}
