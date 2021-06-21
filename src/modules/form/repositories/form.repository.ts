import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { FormDTO } from '../dto/form.dto';
import { Forms } from '../entities/forms.entity';

@Service()
export class FormRepository extends BaseRepository {
  constructor() {
    super(Forms);
  }

  async createForm(userId: string, data: FormDTO) {
    data['userId'] = userId;
    return await this.getRepo().save(data);
  }

  async updateForm(id: number, userId: string, data: FormDTO) {
    return await this.getRepo().update({ id, userId }, data);
  }

  async deleteForm(id: number, userId: string) {
    return await this.getRepo().delete({ id, userId });
  }

  async getUserForms(userId: string) {
    return await this.getRepo().find({ userId });
  }

  async getFormById(id: number) {
    return await this.getRepo().findOne({ id });
  }
}
