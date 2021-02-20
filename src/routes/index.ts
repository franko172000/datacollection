import { Router } from 'express';
import modules from '../modules';

export default () => {
  const router = Router();
  modules(router);
  return router;
};
