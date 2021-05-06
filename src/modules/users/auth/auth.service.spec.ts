import Container from 'typedi';
import { UserLoginDTO } from '../dto/auth.dto';
import AuthService from './auth.service';

jest.mock('./auth.service', () => {
  return jest.fn().mockImplementation(() => {
    return { login: jest.fn() };
  });
});

describe('Testing Auth service class', () => {
  let authservice: AuthService;

  beforeEach(() => {
    //authservice = Container.get(AuthService);
    //AuthService.mockClear()
  });

  it('Testing login function', () => {
    authservice.login.mockResolvedValue();
    //expect(authservice.login).toBeDefined();
  });
});
