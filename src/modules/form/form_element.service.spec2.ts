import Container from 'typedi';
import dbconnection from '../../loaders/dbconnection';
import { FormElements } from './entities/form_elements.entity';
import FormElementsService from './form_elements.service';

let elementService: FormElementsService;
let connection: any;

describe('Test form element service', () => {
  beforeAll(async () => {
    connection = await dbconnection();
    elementService = Container.get(FormElementsService);
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test service can create element', async () => {
    const result = await elementService.createElement({
      formId: 1,
      label: 'Test Label',
      name: 'Test Name',
      type: 'text',
      isRequired: false,
      placeHolder: 'Test',
      validationMsg: 'Test message',
      options: ['test', 'test', 'test'],
      otherProperties: {
        maxLenght: 20,
      },
      pageNo: 1,
      sortNo: 1,
    });
    const totalElements = await FormElements.count();
    expect(totalElements).toEqual(1);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Form created');
    expect(result.data.formId).toEqual(1);
    expect(result.data.id).toEqual(1);
  });
});
