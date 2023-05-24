import { Injectable, NestMiddleware } from '@nestjs/common';

import * as uuid from 'uuid';

import { logger } from '@/utils/logger.util';
import { Request } from '@/common/interfaces';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    request.headers.requestId = uuid.v4();

    logger.info({
      title: 'Start request',
      message: `${request.method}: ${request.url}`,
      params: { requestId: request.headers.requestId },
    });
    next();
  }
}
