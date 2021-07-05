import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { FormElementsDTO, FormIdDTO } from '../dto/form.dto';
import { FormElements } from '../entities/form_elements.entity';

@Service()
@EntityRepository(FormElements)
export class FormElementsRepository extends Repository<FormElements> {
  async createElement(data: FormElementsDTO) {
    data['optionValues'] = data.options.join(',');
    /**this will trigger the @BeforeInsert() event on the entity class */
    return this.save(this.create(data));
  }

  async deleteElement(id: number) {
    return this.delete({ id });
  }

  async updateElement(id: number, data: FormElementsDTO) {
    return this.update({ id }, data);
  }

  async updateElementsPosition(id: number, sortNo: number) {
    return this.update({ id }, { sortNo });
  }

  async getElements(formId: number) {
    return this.find({ formId });
  }

  async getElementById(id: number) {
    return this.findOne(id);
  }
}
