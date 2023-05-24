import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { logger } from '@/utils/logger.util';
import { Request } from '@/common/interfaces';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        logger.info({
          title: `Finish request at ${Date.now() - now}ms`,
          message: `${request.method}: ${request.url}`,
          params: { requestId: request.headers.requestId },
        });
      })
    );
  }
}
