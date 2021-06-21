import { Service } from 'typedi';
import { BaseService } from '../../services/base.service';
import { FormDataRepository } from './repositories/form_data.repository';

@Service()
export default class FormDataService extends BaseService {
  constructor(private readonly formDataRepo: FormDataRepository) {
    super();
  }
}
