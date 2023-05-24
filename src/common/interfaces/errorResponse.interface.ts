import { ErrorCode } from '@/common/enums';

export interface ErrorResponse {
  message: string;
  resource?: string;
  code: ErrorCode;
  data?: any;
}
