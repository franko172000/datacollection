import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { FormData } from '../entities/form_data.entity';

@Service()
export class FormDataRepository extends BaseRepository {
  constructor() {
    super(FormData);
  }
}
