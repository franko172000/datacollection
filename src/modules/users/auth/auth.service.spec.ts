import Container from 'typedi';
import dbconnection from '../../../loaders/dbconnection';
import { UsersRepository } from '../repositories/users.repository';
import AuthService from './auth.service';

const userData = {
  firstName: 'John',
  lastName: 'doe',
  companyName: 'Indexia',
  email: 'test@example.com',
  password: '@JohnDoe123',
};

//jest.mock('../../../brooker/message_brooker');

let authservice: AuthService;
let connection: any;
let userRepo: UsersRepository;

describe('Testing Auth service class', () => {
  beforeAll(async () => {
    //init connection
    connection = await dbconnection();
    authservice = Container.get(AuthService);
    userRepo = Container.get(UsersRepository);
    //AuthService.mockClear()
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test service can register new user', async () => {
    const result1 = await authservice.registerUser(userData);
    const result2 = await userRepo.getRepo().count();
    expect(result2).toEqual(1);
    expect(result1).toHaveProperty('data');
    expect(result1).toHaveProperty('message');
    expect(result1.data).toHaveProperty('token');
  });

  it('Testing user can login', async () => {
    const { email, password } = userData;
    const result = await authservice.login({ email, password });
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
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

  it('Testing service can get user token', async () => {
    const result = await authservice.generateUserToken(userData.email);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('token');
  });
});
