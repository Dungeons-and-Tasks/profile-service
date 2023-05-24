import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorResponse } from '@/common/interfaces';
import { ErrorCode } from '@/common/enums';

export abstract class AppException extends HttpException {
  errorResponse: ErrorResponse;

  protected constructor(message: string, code: ErrorCode, status: HttpStatus, resource?: string, data?: any) {
    super(message, status);
    this.errorResponse = { message, resource, code, data };
  }
}
