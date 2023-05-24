import { HttpStatus } from '@nestjs/common';

import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

export class ForbiddenException extends AppException {
  constructor(message: string, resource?: string) {
    super(message, ErrorCode.Forbidden, HttpStatus.FORBIDDEN);

    this.errorResponse.resource = resource;
  }
}
