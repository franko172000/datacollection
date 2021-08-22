import Container from 'typedi';
import dbconnection from '../../loaders/dbconnection';
import { Users } from '../users/entities/users.entity';
import { AgentService } from './agents.service';

let agentSevice: AgentService;
let connection: any;
describe('Test Agent Service', () => {
  beforeAll(async () => {
    connection = await dbconnection();
    agentSevice = Container.get(AgentService);
  });

  afterAll(done => {
    connection.close();
    done();
  });

  it('Test that service can create agent', async () => {
    // const userObj = new Users();
    // userObj.email = 'test@test.com',
    // userObj.password = 'TestPassword',
    // const user = await Users.create(userObj);

    // console.log(user);
    // const result = await agentSevice.createAgent(
    //   {
    //     firstName: 'Agent',
    //     lastName: '007',
    //     email: 'agent007@test.com',
    //     password: '@Agent007123',
    //     phone: '0801222333444',
    //   },
    //   user.id,
    // );
  });
});
