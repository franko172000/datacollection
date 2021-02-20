import { Router } from 'express';
import auth from '../auth/routes';

/**
 * User management routes
 */
export default (router: Router) => {
  /**
   * Authentication routes
   */
  auth(router);
};
