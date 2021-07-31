import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string // ex) new HttpException('에러메세지')
      | { error: string; statusCode: number; message: string | string[] }; // ex) BadRequestException, ...

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        errorType: 'string', //? 필요없는 부분이니 지워도 된다
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        success: false,
        errorType: 'object',
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
