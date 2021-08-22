import { Body, Controller, Get, Param, Params, Patch, Post, Put, Req, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../controller/base_controller';
import { ResetPasswordDTO } from '../users/dto/auth.dto';
import { AuthGuard } from '../users/middleware/auth.middleware';
import { AgentService } from './agents.service';
import { AgentDTO } from './dto/agent.dto';

@Service()
@Controller('agents')
@UseBefore(AuthGuard)
export class AgentController extends BaseController {
  constructor(private readonly agentService: AgentService) {
    super();
  }

  @Post('/')
  async createAgent(@Body() body: AgentDTO, @Req() req: any) {
    return await this.agentService.createAgent(body, this.getUserIdFromRequest(req));
  }

  @Get('/')
  async getAgents(@Req() req: any) {
    return await this.agentService.getAgents(this.getUserIdFromRequest(req));
  }

  @Put('/')
  async updateAgentProfile(@Body() body: AgentDTO, @Req() req: any) {
    return await this.agentService.updateAgent(body, this.getUserIdFromRequest(req));
  }

  @Get('/:id')
  async getAgent(@Param('id') id: string) {
    return await this.agentService.getAgentById(id);
  }

  @Put('/:id')
  async updateAgent(@Body() body: AgentDTO, @Param('id') id: string) {
    return await this.agentService.updateAgent(body, id);
  }

  @Patch('/password')
  async updatePassword(@Body() body: ResetPasswordDTO, @Req() req: any) {
    return await this.agentService.updatePassword(body.password, this.getUserIdFromRequest(req));
  }

  @Patch('/password/:id')
  async updateAgentPassword(@Body() body: ResetPasswordDTO, @Param('id') id: string) {
    return await this.agentService.updatePassword(body.password, id);
  }
}
