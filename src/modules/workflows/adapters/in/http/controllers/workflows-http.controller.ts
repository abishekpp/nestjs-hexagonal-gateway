import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateWorkflowGatewayUseCase } from '../../../../application/use-cases/create-workflow-gateway.use-case';
import { ListWorkflowsGatewayUseCase } from '../../../../application/use-cases/list-workflows-gateway.use-case';
import { UpdateWorkflowStatusGatewayUseCase } from '../../../../application/use-cases/update-workflow-status-gateway.use-case';
import { CreateWorkflowRequestDto } from '../dto/requests/create-workflow.request';
import { UpdateWorkflowStatusRequestDto } from '../dto/requests/update-workflow-status.request';
import { WorkflowDataResponseDto } from '../dto/responses/workflow.response';
import { toWorkflowResponse } from '../mappers/workflow-http.mapper';

@ApiTags('Workflows')
@Controller('workflows')
export class WorkflowsHttpController {
  constructor(
    private readonly createWorkflowUseCase: CreateWorkflowGatewayUseCase,
    private readonly listWorkflowsUseCase: ListWorkflowsGatewayUseCase,
    private readonly updateWorkflowStatusUseCase: UpdateWorkflowStatusGatewayUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Workflow created successfully',
    type: WorkflowDataResponseDto,
  })
  async create(@Body() body: CreateWorkflowRequestDto) {
    // later replace with @CurrentUser()
    const createdBy = 'current-user-id';

    const output = await this.createWorkflowUseCase.execute({
      projectId: body.projectId,
      subject: body.subject,
      documentIds: body.documentIds,
      recipientIds: body.recipientIds,
      dueDate: body.dueDate,
      remarks: body.remarks,
      createdBy,
    });

    return {
      success: true,
      message: 'Workflow created successfully',
      data: toWorkflowResponse(output),
    };
  }

  @Get()
  @ApiOkResponse({
    description: 'Workflows fetched successfully',
    type: [WorkflowDataResponseDto],
  })
  async findAll() {
    const outputs = await this.listWorkflowsUseCase.execute();

    return {
      success: true,
      message: 'Workflows fetched successfully',
      data: outputs.map(toWorkflowResponse),
    };
  }

  @Patch(':id/status')
  @ApiOkResponse({
    description: 'Workflow status updated successfully',
    type: WorkflowDataResponseDto,
  })
  async updateStatus(@Param('id') id: string, @Body() body: UpdateWorkflowStatusRequestDto) {
    const output = await this.updateWorkflowStatusUseCase.execute({
      id,
      status: body.status,
    });

    return {
      success: true,
      message: 'Workflow status updated successfully',
      data: toWorkflowResponse(output),
    };
  }
}
