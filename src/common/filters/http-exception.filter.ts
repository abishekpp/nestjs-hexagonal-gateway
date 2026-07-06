import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Request, Response } from 'express';
import { ErrorResponseDto } from 'src/shared/interfaces/api-response.interface';

type GrpcClientError = Error & {
  code: number;
  details?: string;
  metadata?: {
    get(key: string): Array<string | Buffer>;
  };
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode: number = this.getStatusCode(exception);
    const exceptionResponse = this.getExceptionResponse(exception);

    const errorResponse: ErrorResponseDto = {
      success: false,
      statusCode,
      message: this.getMessage(exceptionResponse),
      errorCode: this.getErrorCode(exceptionResponse, statusCode),
      details: this.getDetails(exceptionResponse),
    };

    if (statusCode >= 500) {
      const errorCode = `${request.method} ${request.url} - ${statusCode}`;
      const errorMsg = exception instanceof Error ? exception.stack : String(exception);

      this.logger.error(errorCode, errorMsg);
    }

    response.status(statusCode).json(errorResponse);
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    if (this.isGrpcError(exception)) {
      return this.mapGrpcCodeToHttpStatus(exception.code);
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getExceptionResponse(exception: unknown): unknown {
    if (exception instanceof HttpException) {
      return exception.getResponse();
    }

    if (this.isGrpcError(exception)) {
      return {
        message: this.getGrpcMessage(exception),
        errorCode: this.getGrpcErrorCode(exception),
      };
    }

    return {
      message: 'Internal server error',
      errorCode: 'INTERNAL_SERVER_ERROR',
    };
  }

  private getMessage(exceptionResponse: unknown): string | string[] {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      return (exceptionResponse as { message: string | string[] }).message;
    }

    return 'Internal server error';
  }

  private getErrorCode(exceptionResponse: unknown, statusCode: number): string {
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'errorCode' in exceptionResponse
    ) {
      return (exceptionResponse as { errorCode: string }).errorCode;
    }

    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'UNPROCESSABLE_ENTITY';
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'SERVICE_UNAVAILABLE';
      case HttpStatus.GATEWAY_TIMEOUT:
        return 'GATEWAY_TIMEOUT';
      default:
        return 'INTERNAL_SERVER_ERROR';
    }
  }

  private getDetails(exceptionResponse: unknown): unknown {
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'details' in exceptionResponse
    ) {
      return (exceptionResponse as { details: unknown }).details;
    }

    return undefined;
  }

  private isGrpcError(exception: unknown): exception is GrpcClientError {
    return (
      exception instanceof Error && typeof (exception as Partial<GrpcClientError>).code === 'number'
    );
  }

  private mapGrpcCodeToHttpStatus(code: number): number {
    switch (code) {
      case status.INVALID_ARGUMENT:
        return HttpStatus.BAD_REQUEST;

      case status.NOT_FOUND:
        return HttpStatus.NOT_FOUND;

      case status.ALREADY_EXISTS:
        return HttpStatus.CONFLICT;

      case status.UNAUTHENTICATED:
        return HttpStatus.UNAUTHORIZED;

      case status.PERMISSION_DENIED:
        return HttpStatus.FORBIDDEN;

      case status.UNAVAILABLE:
        return HttpStatus.SERVICE_UNAVAILABLE;

      case status.DEADLINE_EXCEEDED:
        return HttpStatus.GATEWAY_TIMEOUT;

      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private getGrpcMessage(exception: GrpcClientError): string {
    if (exception.details) {
      return exception.details;
    }

    return exception.message.replace(/^\d+\s[A-Z_]+:\s/, '');
  }

  private getGrpcErrorCode(exception: GrpcClientError): string {
    const metadataErrorCode = exception.metadata?.get?.('error-code')?.[0];

    if (metadataErrorCode) {
      return metadataErrorCode.toString();
    }

    switch (exception.code) {
      case status.INVALID_ARGUMENT:
        return 'INVALID_ARGUMENT';
      case status.NOT_FOUND:
        return 'NOT_FOUND';
      case status.ALREADY_EXISTS:
        return 'ALREADY_EXISTS';
      case status.UNAUTHENTICATED:
        return 'UNAUTHENTICATED';
      case status.PERMISSION_DENIED:
        return 'PERMISSION_DENIED';
      case status.UNAVAILABLE:
        return 'SERVICE_UNAVAILABLE';
      case status.DEADLINE_EXCEEDED:
        return 'DEADLINE_EXCEEDED';
      default:
        return 'GRPC_ERROR';
    }
  }
}
