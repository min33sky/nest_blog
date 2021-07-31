import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before ...... (Success Interceptor)');
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
      tap((data) => console.log('After ......: ', data)),
    );
  }
}
