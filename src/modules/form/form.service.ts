import { InternalServerError, NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../services/base.service';
import { FormDTO, FormIdDTO } from './dto/form.dto';
import { FormRepository } from './repositories/form.repository';

@Service()
export default class FormService extends BaseService {
  constructor(private readonly formRepo: FormRepository) {
    super();
  }

  async addForm(data: FormDTO, userId: string) {
    const result = await this.formRepo.createForm(userId, data);

    if (!result) {
      new InternalServerError('Error creating record. Please try again later');
    }

    return this.okResponse('Form created', result);
  }

  async updateForm(id: FormIdDTO, data: FormDTO, userId: string) {
    const result = await this.formRepo.updateForm(id, userId, data);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Form updated');
  }

  async deleteForm(id: FormIdDTO, userId: string) {
    const result = await this.formRepo.deleteForm(id, userId);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Form deleted');
  }

  async getUserForms(userId: string) {
    const result = await this.formRepo.getUserForms(userId);

    if (result.length === 0) {
      throw new NotFoundError('Form not found');
    }
    return this.okResponse('User forms', result);
  }

  async getSingleForm(id: FormIdDTO) {
    const result = await this.formRepo.getFormById(id);

    if (!result) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Ok', result);
  }
}
