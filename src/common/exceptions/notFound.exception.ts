import { HttpStatus } from '@nestjs/common';

import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

export class NotFoundException extends AppException {
  constructor(message: string, resource?: string) {
    super(message, ErrorCode.NotFound, HttpStatus.NOT_FOUND);

    this.errorResponse.resource = resource;
  }
}
