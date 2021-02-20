import { Router } from 'express';
import { Container } from 'typedi';
import AuthController from './auth.controller';
const route = Router();
const controller = Container.get(AuthController);

/**
 * Authentication routes
 */
export default (router: Router) => {
  router.use('/auth', route);

  route.get('/login', controller.login.bind(controller));
};
