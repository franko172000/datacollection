import { NotFoundError } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseService } from '../../services/base.service';
import { FormElementsDTO, FormIdDTO } from './dto/form.dto';
import { FormElementsRepository } from './repositories/form_elements.repository';

@Service()
export default class FormElementsService extends BaseService {
  constructor(private readonly elementsRepo: FormElementsRepository) {
    super();
  }

  /**
   * Adds new element
   * @param data FormElementsDTO
   * @returns object
   */
  async createElement(data: FormElementsDTO) {
    const result = await this.elementsRepo.createElement(data);
    return this.okResponse('ok', result);
  }

  /**
   * Removes element
   * @param id number
   * @returns object
   */
  async deleteElement(id: FormIdDTO) {
    const result = await this.elementsRepo.deleteElement(id);
    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Element not found');
    }
    return this.okResponse();
  }

  /**
   * Updates element
   * @param id number
   * @param data FormElementsDTO
   * @returns object
   */
  async updateElement(id: FormIdDTO, data: FormElementsDTO) {
    const result = await this.elementsRepo.updateElement(id, data);
    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Element not found');
    }
    return this.okResponse();
  }

  /**
   * updates element's position
   * @param id number
   * @param sortNo number
   * @returns object
   */
  async updateElementsPosition(id: FormIdDTO, sortNo: number) {
    const result = await this.elementsRepo.updateElementsPosition(id, sortNo);
    if (result.raw.affectedRows === 0) {
      throw new NotFoundError('Element not found');
    }
    return this.okResponse();
  }

  /**
   * Get elements
   * @param formId number
   * @returns object
   */
  async getElements(formId: FormIdDTO) {
    const result = await this.elementsRepo.getElements(formId);
    return this.okResponse('ok', result);
  }

  /**
   * Get element by id
   * @param id number
   * @returns object
   */
  async getElementById(id: FormIdDTO) {
    const result = await this.elementsRepo.getElementById(id);
    if (!result) {
      throw new NotFoundError('Element not found');
    }
    return this.okResponse('ok', result);
  }
}
