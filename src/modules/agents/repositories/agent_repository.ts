import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { AgentDTO, UpdateAgentDTO } from '../dto/agent.dto';
import { AgentsEntity } from '../entities/agents.entity';

@Service()
@EntityRepository(AgentsEntity)
export default class AgentRepository extends Repository<AgentsEntity> {
  async addAgent(data: AgentDTO, userId: string) {
    data['userId'] = userId;
    return this.save(data);
  }

  async updateAgent(data: UpdateAgentDTO, id: string) {
    return this.update({ id }, data);
  }

  async updatePassword(password: string, id: string) {
    return this.update({ id }, { password });
  }

  async getAgentByEmail(email: string) {
    return this.findOne({ email });
  }

  async getAgents(userId: string) {
    return this.find({ userId });
  }

  async getAgentById(id: string) {
    return this.findOne({ id });
  }
}
