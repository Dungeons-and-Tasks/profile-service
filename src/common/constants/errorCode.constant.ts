import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/common/enums';

export const errorCodeByHttpStatus = {
  [HttpStatus.INTERNAL_SERVER_ERROR]: ErrorCode.Internal,
  [HttpStatus.UNAUTHORIZED]: ErrorCode.Unauthorized,
  [HttpStatus.BAD_REQUEST]: ErrorCode.BadRequest,
  [HttpStatus.BAD_GATEWAY]: ErrorCode.BadGateway,
  [HttpStatus.FORBIDDEN]: ErrorCode.Forbidden,
  [HttpStatus.NOT_FOUND]: ErrorCode.NotFound,
  [HttpStatus.CONFLICT]: ErrorCode.Conflict,
} as {
  [key in HttpStatus]: ErrorCode;
};

export const httpStatusByErrorCode = {
  [ErrorCode.Internal]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ErrorCode.Unauthorized]: HttpStatus.UNAUTHORIZED,
  [ErrorCode.BadRequest]: HttpStatus.BAD_REQUEST,
  [ErrorCode.BadGateway]: HttpStatus.BAD_GATEWAY,
  [ErrorCode.Forbidden]: HttpStatus.FORBIDDEN,
  [ErrorCode.NotFound]: HttpStatus.NOT_FOUND,
  [ErrorCode.Conflict]: HttpStatus.CONFLICT,
} as {
  [key in ErrorCode]: HttpStatus;
};
