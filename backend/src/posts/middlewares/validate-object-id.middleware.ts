import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class ValidateObjectIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ObjectId } = mongoose.Types;

    /**
     * ? 라우터를 지나지 않아서 req.params는 빈객체이므로
     * ? url을 이용해서 id값들을 필터링 해서 검증해보자
     */
    console.log('ObjectId 검증 미들웨어 자동!!!!!!!!!!!!!!!!!!!!!!!');
    if (req.url !== '/') {
      const objectIds = req.url
        .split(/comments/)
        .map((item) => item.replace(/\//g, ''));

      objectIds.forEach((id) => {
        if (!ObjectId.isValid(id))
          throw new BadRequestException('잘못된 형식의 ID입니다.');
      });
    }

    next();
  }
}
