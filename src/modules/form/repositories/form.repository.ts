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
    return this.getRepo().save(data);
  }

  async updateForm(id: number, userId: string, data: FormDTO) {
    return this.getRepo().update({ id, userId }, data);
  }

  async deleteForm(id: number, userId: string) {
    return this.getRepo().delete({ id, userId });
  }

  async getUserForms(userId: string) {
    return this.getRepo().find({ userId });
  }

  async getFormById(id: number) {
    return this.getRepo().findOne({ id });
  }
}
