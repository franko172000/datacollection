import { getConnection } from 'typeorm';

export abstract class BaseRepository {
  private readonly entity: any;

  constructor(entity: any) {
    this.entity = entity;
  }

  getRepo() {
    return getConnection().getRepository(this.entity)
  }
}
