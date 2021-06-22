import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import { BaseController } from '../../controller/base_controller';
import { AuthGuard } from '../users/middleware/auth.middleware';
import { FormDTO, FormElementsDTO, FormIdDTO } from './dto/form.dto';
import FormService from './form.service';
import FormDataService from './form_data.service';
import FormElementsService from './form_elements.service';

@Controller('form/')
@UseBefore(AuthGuard)
@Service()
export class FormController extends BaseController {
  constructor(
    private readonly formService: FormService,
    private readonly formElementsService: FormElementsService,
    private readonly formDataService: FormDataService,
  ) {
    super();
  }

  /** Form routes */
  @Post('main/create')
  async addForm(@Body() body: FormDTO, @Req() req: any) {
    return this.formService.addForm(body, this.getUserIdFromRequest(req));
  }

  @Get('main/all')
  async getForms(@Req() req: any) {
    return this.formService.getUserForms(this.getUserIdFromRequest(req));
  }

  @Get('main/:id')
  async getFormById(@Param('id') id: FormIdDTO) {
    return this.formService.getSingleForm(id);
  }

  @Put('main/:id')
  async updateForm(@Body() body: FormDTO, @Param('id') id: FormIdDTO, @Req() req: any) {
    return this.formService.updateForm(id, body, this.getUserIdFromRequest(req));
  }

  @Delete('main/:id')
  async deleteForm(@Param('id') id: FormIdDTO, @Req() req: any) {
    return this.formService.deleteForm(id, this.getUserIdFromRequest(req));
  }

  /** Form elements routes */
  @Post('element/create')
  async addElement(@Body() body: FormElementsDTO) {
    return this.formElementsService.createElement(body);
  }

  @Put('element/:id')
  async updateElement(@Param('id') id: FormIdDTO, @Body() body: FormElementsDTO) {
    return this.formElementsService.updateElement(id, body);
  }

  @Delete('element/:id')
  async deleteElement(@Param('id') id: FormIdDTO) {
    return this.formElementsService.deleteElement(id);
  }

  @Get('element/:id')
  async getElement(@Param('id') id: FormIdDTO) {
    return this.formElementsService.getElementById(id);
  }

  @Get('element/all/:formId')
  async getElements(@Param('formId') id: FormIdDTO) {
    return this.formElementsService.getElements(id);
  }
}
