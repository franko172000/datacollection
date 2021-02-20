import { Container } from 'typedi';
import AuthService from './auth.service';
const authService = Container.get(AuthService);

export default {
  authService,
};
