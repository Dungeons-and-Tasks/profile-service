import { HttpStatus } from '@nestjs/common';

import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

export class ConflictException extends AppException {
  constructor(message: string, resource?: string) {
    super(message, ErrorCode.Conflict, HttpStatus.CONFLICT);

    this.errorResponse.resource = resource;
  }
}
