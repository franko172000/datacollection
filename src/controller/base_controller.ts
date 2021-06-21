export abstract class BaseController {
  getUserIdFromRequest(req: any) {
    return req.params.userId;
  }
}
