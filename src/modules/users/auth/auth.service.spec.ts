import Container from 'typedi';
import dbconnection from '../../../loaders/dbconnection';
import { accountStatus } from '../enum';
import * as bcrypt from 'bcrypt';
import AuthService from './auth.service';
import { Users } from '../entities/users.entity';

const userData = {
  firstName: 'John',
  lastName: 'doe',
  companyName: 'Indexia',
  email: 'test@example.com',
  password: '@JohnDoe123',
};

let registeredUser: any;
let authservice: AuthService;
let connection: any;

describe('Testing Auth service class', () => {
  beforeAll(async () => {
    //init connection
    connection = await dbconnection();
    authservice = Container.get(AuthService);
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test service can register new user', async () => {
    const result = await authservice.registerUser(userData);
    registeredUser = await Users.find();
    const user: any = registeredUser[0];
    expect(registeredUser.length).toEqual(1);
    expect(user).toHaveProperty('profile');
    expect(user.profile).toHaveProperty('userId');
    expect(user.profile.userId).toEqual(user.id);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toEqual(expect.any(String));
    expect(result.message).toEqual('User created!');
  });

  it('Test user can login', async () => {
    const { email, password } = userData;
    const result = await authservice.login({ email, password });
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toEqual(expect.any(String));
    expect(result.message).toEqual('Login valid');
  });

  it('Testing invalid login', async () => {
    try {
      await authservice.login({
        email: 'test@test.com',
        password: '@Test123',
      });
    } catch (err) {
      expect(err.message).toEqual('Invalid credentials');
      expect(err.httpCode).toEqual(401);
    }
  });

  it('Test service can generate user token', async () => {
    const result = await authservice.generateUserToken(userData.email);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toEqual(expect.any(String));
    expect(result.message).toEqual('Generated Token');
  });

  it('Test service can activate account', async () => {
    const id = registeredUser[0].id;
    const result = await authservice.confirmEmail(id);
    const user: any = await Users.findOne({ id });
    expect(user).toHaveProperty('isActivated');
    expect(user).toHaveProperty('accountStatus');
    expect(user.isActivated).toEqual(true);
    expect(user.accountStatus).toEqual(accountStatus.ac);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Account activated');
  });

  it('Test service account activation can fail', async () => {
    try {
      await authservice.confirmEmail('test_id');
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('User not found');
    }
  });

  it('Test forgot password request', async () => {
    const result = await authservice.forgotPassword(userData.email);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toEqual(expect.any(String));
    expect(result.message).toEqual('Password reset email sent');
  });

  it('Test forgot password request can fail', async () => {
    try {
      await authservice.forgotPassword('test_email@test.com');
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('User not found');
    }
  });

  it('Test service can reset password', async () => {
    const { id, password } = registeredUser[0];
    const result = await authservice.resetPassword(
      {
        password: '@Testing1234',
        token: 'test token',
      },
      id,
    );
    const updatedUser: any = await Users.findOne({ id });
    const checkPassword = await bcrypt.compare(password, updatedUser.password);
    expect(checkPassword).toEqual(false);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Password updated');
  });

  it('Test reset password can fail', async () => {
    try {
      await authservice.resetPassword(
        {
          password: '@Testing1234',
          token: 'test token',
        },
        'testID',
      );
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('User not found');
    }
  });

  it('Test service can update password', async () => {
    const { id, password } = registeredUser[0];
    const result = await authservice.updateUserPassword('@Testing1234', id);
    const updatedUser: any = await Users.findOne({ id });
    const checkPassword = await bcrypt.compare(password, updatedUser.password);
    expect(checkPassword).toEqual(false);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Password updated');
  });

  it('Test update password can fail', async () => {
    try {
      await authservice.updateUserPassword('@Testing1234', 'test_user_id');
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('User not found');
    }
  });
});
