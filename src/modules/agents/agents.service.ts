import { InternalServerError, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../services/base.service';
import { UserLoginDTO } from '../users/dto/auth.dto';
import { AgentDTO, UpdateAgentDTO } from './dto/agent.dto';
import AgentRepository from './repositories/agent_repository';
import * as bcrypt from 'bcrypt';
import AuthGuardSerivce from '../users/auth/auth_guard.service';
import { Service } from 'typedi';

@Service()
export class AgentService extends BaseService {
  constructor(
    @InjectRepository(AgentRepository) private readonly agentRepo: AgentRepository,
    private readonly authGuard: AuthGuardSerivce,
  ) {
    super();
  }

  async createAgent(agent: AgentDTO, userId: string) {
    const data = await this.agentRepo.addAgent(agent, userId);
    if (!data) {
      throw new InternalServerError('Error creating agent, please try again');
    }
    return this.okResponse('Agent created', data);
  }

  async loginAgent(data: UserLoginDTO) {
    const { email, password } = data;

    const agent = await this.agentRepo.getAgentByEmail(email);

    if (!agent || !(await bcrypt.compare(password, agent.password))) {
      throw new UnauthorizedError('Invalid login');
    }

    const token = this.authGuard.generateToken(agent.id, agent.email);
    return this.okResponse('Agent created', { token });
  }

  async updateAgent(data: UpdateAgentDTO, agentId: string) {
    const agent = await this.agentRepo.updateAgent(data, agentId);

    if (agent.raw.affectedRows === 0) {
      throw new NotFoundError('Agent not found');
    }

    return this.okResponse('Agent updated');
  }

  async getAgents(userId: string) {
    const agents = await this.agentRepo.getAgents(userId);
    return this.okResponse('Agents', agents);
  }

  async getAgentById(agentId: string) {
    const agent = await this.agentRepo.getAgentById(agentId);
    if (!agent) {
      throw new NotFoundError('Agent not found');
    }
    return this.okResponse('Agent', agent);
  }

  async updatePassword(password: string, agentId: string) {
    const agent = await this.agentRepo.updatePassword(password, agentId);
    if (!agent) {
      throw new NotFoundError('Agent not found');
    }
    return this.okResponse('Password updated', agent);
  }
}
