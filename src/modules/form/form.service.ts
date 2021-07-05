import { InternalServerError, NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../services/base.service';
import { FormDTO } from './dto/form.dto';
import { FormRepository } from './repositories/form.repository';

@Service()
export default class FormService extends BaseService {
  constructor(@InjectRepository(FormRepository) private readonly formRepo: FormRepository) {
    super();
  }

  async addForm(data: FormDTO, userId: string) {
    const result = await this.formRepo.createForm(userId, data);
    if (!result) {
      new InternalServerError('Error creating record. Please try again later');
    }

    return this.okResponse('Form created', result);
  }

  async updateForm(formId: number, data: FormDTO, userId: string) {
    const result = await this.formRepo.updateForm(formId, userId, data);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Form updated');
  }

  async deleteForm(formId: number, userId: string) {
    const result = await this.formRepo.deleteForm(formId, userId);

    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Form deleted');
  }

  async getUserForms(userId: string) {
    const result = await this.formRepo.getUserForms(userId);

    if (result.length === 0) {
      throw new NotFoundError('Forms not found');
    }
    return this.okResponse('User forms', result);
  }

  async getSingleForm(formId: number) {
    const result = await this.formRepo.getFormById(formId);

    if (!result) {
      throw new NotFoundError('Form not found');
    }

    return this.okResponse('Ok', result);
  }
}
