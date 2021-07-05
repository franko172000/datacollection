import Container from 'typedi';
import dbconnection from '../../loaders/dbconnection';
import { Users } from '../users/entities/users.entity';
import { Forms } from './entities/forms.entity';
import FormService from './form.service';

let formSevice: FormService;
let connection: any;
let user: Users;
describe('Test all form services', () => {
  beforeAll(async () => {
    connection = await dbconnection();
    formSevice = Container.get(FormService);
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test that service can create new form', async () => {
    user = new Users();
    user.email = 'formTest101@gmail.com';
    user.password = 'testPassword';
    user = await user.save();

    const formData = {
      name: 'Test Form',
      description: 'Test description',
      pageCount: 1,
    };
    const result = await formSevice.addForm(formData, user.id);
    const formCount = await Forms.count();
    expect(formCount).toEqual(1);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Form created');
    expect(result.data.userId).toEqual(user.id);
    expect(result.data.description).toEqual(formData.description);
    expect(result.data.pageCount).toEqual(formData.pageCount);
    expect(result.data.name).toEqual(formData.name);
  });

  it('Test that service can update form', async () => {
    const formData = {
      name: 'Updated Test Form',
      description: 'Updated Test description',
      pageCount: 2,
    };
    const result = await formSevice.updateForm(1, formData, user.id);
    const form = await Forms.findOne({ id: 1 });
    expect(form).toHaveProperty('id');
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Form updated');
    expect(form.userId).toEqual(user.id);
    expect(form.description).toEqual(formData.description);
    expect(form.pageCount).toEqual(formData.pageCount);
    expect(form.name).toEqual(formData.name);
  });

  it('Test that service can retrieve user forms', async () => {
    const result = await formSevice.getUserForms(user.id);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('User forms');
    expect(result.data.length).toEqual(1);
  });

  it('Test that service can return 404 when no user form exists', async () => {
    try {
      await formSevice.getUserForms('test_user');
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('Forms not found');
    }
  });

  it('Test that service can retrieve form by id', async () => {
    const result = await formSevice.getSingleForm(1);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Ok');
    expect(result.data.id).toEqual(1);
    expect(result.data.userId).toEqual(user.id);
  });

  it('Test form update can fail', async () => {
    try {
      const formData = {
        name: 'Updated Test Form',
        description: 'Updated Test description',
        pageCount: 2,
      };
      await formSevice.updateForm(2, formData, user.id);
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('Form not found');
    }
  });

  it('Test form delete can fail', async () => {
    try {
      await formSevice.deleteForm(2, user.id);
    } catch (err) {
      expect(err.httpCode).toEqual(404);
      expect(err.message).toEqual('Form not found');
    }
  });

  it('Test that service can delete form', async () => {
    const result = await formSevice.deleteForm(1, user.id);
    const form = await Forms.count();
    expect(form).toEqual(0);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.message).toEqual('Form deleted');
  });
});
