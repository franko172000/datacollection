import { Response } from 'express';

/**
 * Base service class to handle http responses and related functions
 */
export abstract class BaseService {
  okResponse(message: string, data?: any, customCode?: number) {
    return {
      message,
      data,
      customCode,
    };
  }
}
