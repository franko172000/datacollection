import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { FormElementsDTO, FormIdDTO } from '../dto/form.dto';
import { FormElements } from '../entities/form_elements.entity';

@Service()
export class FormElementsRepository extends BaseRepository {
  constructor() {
    super(FormElements);
  }

  async createElement(data: FormElementsDTO) {
    data['optionValues'] = data.options.join(',');
    /**this will trigger the @BeforeInsert() event on the entity class */
    return this.getRepo().save(this.getRepo().create(data));
  }

  async deleteElement(id: FormIdDTO) {
    return this.getRepo().delete({ id });
  }

  async updateElement(id: FormIdDTO, data: FormElementsDTO) {
    return this.getRepo().update({ id }, data);
  }

  async updateElementsPosition(id: FormIdDTO, sortNo: number) {
    return this.getRepo().update({ id }, { sortNo });
  }

  async getElements(formId: FormIdDTO) {
    return this.getRepo().find({ formId });
  }

  async getElementById(id: FormIdDTO) {
    return this.getRepo().findOne(id);
  }
}
