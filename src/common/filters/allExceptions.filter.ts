import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { errorCodeByHttpStatus } from '@/common/constants';
import { ErrorResponse } from '@/common/interfaces';
import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let responseBody: ErrorResponse;
    let httpStatus: number;

    if (exception instanceof AppException) {
      responseBody = exception.errorResponse;
      httpStatus = exception.getStatus();
    } else if (exception instanceof HttpException) {
      responseBody = {
        message: exception.message,
        code: errorCodeByHttpStatus[exception.getStatus()] ?? ErrorCode.Internal,
      };
      httpStatus = exception.getStatus();
    } else {
      responseBody = { message: 'something went wrong.', code: ErrorCode.Internal };
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
