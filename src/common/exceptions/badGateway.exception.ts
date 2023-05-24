import { HttpStatus } from '@nestjs/common';

import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

export class BadGatewayException extends AppException {
  constructor(message: string, resource?: string) {
    super(message, ErrorCode.BadGateway, HttpStatus.BAD_GATEWAY);

    this.errorResponse.resource = resource;
  }
}
