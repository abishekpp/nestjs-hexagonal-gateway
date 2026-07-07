import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransmittalGatewayUseCase } from '../../../../application/use-cases/create-transmittal-gateway.use-case';
import { GetTransmittalByIdGatewayUseCase } from '../../../../application/use-cases/get-transmittal-by-id-gateway.use-case';
import { CreateTransmittalRequestDto } from '../dto/requests/create-transmittal.request';
import { CreateTransmittalDataResponseDto } from '../dto/responses/create-transmittal.response';
import { TransmittalDataResponseDto } from '../dto/responses/transmittal.response';
import {
  toCreateTransmittalResponse,
  toTransmittalResponse,
} from '../mappers/transmittal-http.mapper';

@ApiTags('Transmittals')
@Controller('transmittals')
export class TransmittalsHttpController {
  constructor(
    private readonly createTransmittalUseCase: CreateTransmittalGatewayUseCase,
    private readonly getTransmittalByIdUseCase: GetTransmittalByIdGatewayUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Transmittal created successfully',
    type: CreateTransmittalDataResponseDto,
  })
  async create(@Body() body: CreateTransmittalRequestDto) {
    // later replace with @CurrentUser()
    const createdBy = 'current-user-id';

    const output = await this.createTransmittalUseCase.execute({
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
      message: 'Transmittal created successfully',
      data: toCreateTransmittalResponse(output),
    };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Transmittal fetched successfully',
    type: TransmittalDataResponseDto,
  })
  async findById(@Param('id') id: string) {
    const output = await this.getTransmittalByIdUseCase.execute(id);

    return {
      success: true,
      message: 'Transmittal fetched successfully',
      data: output ? toTransmittalResponse(output) : null,
    };
  }
}
