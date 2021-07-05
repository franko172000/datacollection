import Container from 'typedi';
import dbconnection from '../../../loaders/dbconnection';
import { OTPService } from './otp.service';

let otpService: OTPService;
let connection: any;
const userId = 'Test12345';
let otpCode: number;
describe('Testing OTP service class', () => {
  beforeAll(async () => {
    //init connection
    connection = await dbconnection();
    otpService = Container.get(OTPService);
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test service can generate 6 digit OTP', async () => {
    otpCode = await otpService.generateOTP(userId);
    expect(otpCode).toEqual(expect.any(Number));
    expect(otpCode.toString().length).toEqual(6);
  });

  it('Test service can validate 6 digit OTP', async () => {
    const result = await otpService.validateOTP(userId, otpCode);
    expect(result).toEqual(true);
  });
});
