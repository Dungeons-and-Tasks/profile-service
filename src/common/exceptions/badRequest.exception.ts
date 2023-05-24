import { HttpStatus, ValidationError } from '@nestjs/common';
import {
  IS_ARRAY,
  IS_BOOLEAN,
  IS_EMAIL,
  IS_ENUM,
  IS_INT,
  IS_NOT_EMPTY,
  IS_NUMBER,
  IS_OBJECT,
  IS_STRING,
  IS_UUID,
  MAX,
  MIN,
} from 'class-validator';

import { AppException } from '@/common/exceptions';
import { ErrorCode } from '@/common/enums';

enum CustomValidationErrorCode {
  // common check
  Missing = 'missing',

  // type check
  IsBoolean = 'is_boolean',
  IsNumber = 'is_number',
  IsInt = 'is_int',
  IsString = 'is_string',
  IsArray = 'is_array',
  IsObject = 'is_object',
  IsEnum = 'is_enum',

  // format check
  IsEmail = 'is_email',
  IsUUID = 'is_uuid',
  IsLessMin = 'is_less_min',
  IsMoreMax = 'is_more_max',
}

const errorCodeMap = {
  [IS_NOT_EMPTY]: CustomValidationErrorCode.Missing,
  [IS_BOOLEAN]: CustomValidationErrorCode.IsBoolean,
  [IS_NUMBER]: CustomValidationErrorCode.IsNumber,
  [IS_INT]: CustomValidationErrorCode.IsInt,
  [IS_STRING]: CustomValidationErrorCode.IsString,
  [IS_ARRAY]: CustomValidationErrorCode.IsArray,
  [IS_OBJECT]: CustomValidationErrorCode.IsObject,
  [IS_ENUM]: CustomValidationErrorCode.IsEnum,
  [IS_EMAIL]: CustomValidationErrorCode.IsEmail,
  [IS_UUID]: CustomValidationErrorCode.IsUUID,
  [MIN]: CustomValidationErrorCode.IsLessMin,
  [MAX]: CustomValidationErrorCode.IsMoreMax,
} as {
  [key: string]: CustomValidationErrorCode;
};

interface CustomValidationError {
  field: string;
  code: CustomValidationErrorCode;
}

export class BadRequestException extends AppException {
  constructor(message: string, errors?: ValidationError[], resource?: string) {
    super(message, ErrorCode.BadRequest, HttpStatus.BAD_REQUEST);

    this.errorResponse.data = errors && errors.length > 0 ? this.convertToCustomValidationError(errors) : null;
    this.errorResponse.resource = resource ?? errors[0].target.constructor.name;
  }

  convertToCustomValidationError(errors: ValidationError[]) {
    const customValidationError = [] as CustomValidationError[];

    errors.forEach((error) => {
      Object.keys(error.constraints).forEach((constraint) => {
        customValidationError.push({ field: error.property, code: errorCodeMap[constraint] });
      });
    });

    return customValidationError;
  }
}
