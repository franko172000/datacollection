import { Router } from 'express';
import users from './users/routes';
export default (router: Router) => {
  users(router);
};
