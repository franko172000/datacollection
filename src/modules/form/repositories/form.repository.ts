import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { FormDTO } from '../dto/form.dto';
import { Forms } from '../entities/forms.entity';

@Service()
@EntityRepository(Forms)
export class FormRepository extends Repository<Forms> {
  async createForm(userId: string, data: FormDTO) {
    data['userId'] = userId;
    return this.save(data);
  }

  async updateForm(id: number, userId: string, data: FormDTO) {
    return this.update({ id, userId }, data);
  }

  async deleteForm(id: number, userId: string) {
    return this.delete({ id, userId });
  }

  async getUserForms(userId: string) {
    return this.find({ userId });
  }

  async getFormById(id: number) {
    return this.findOne({ id });
  }
}
