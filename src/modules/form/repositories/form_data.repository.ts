import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { FormData } from '../entities/form_data.entity';

@Service()
@EntityRepository(FormData)
export class FormDataRepository extends Repository<FormData> {}
