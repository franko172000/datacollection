/**
 * Base service class to handle http responses and related functions
 */
export abstract class BaseService {
  okResponse(message = 'ok', data?: any, customCode?: number) {
    return {
      message,
      data,
      customCode,
    };
  }
}
