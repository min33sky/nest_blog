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
     * ? 기존 express 미들웨어와 달리 라우터를 아직 지나지 않아서
     * ? req.params는 빈객체이므로
     * ? url을 이용해서 id값들을 필터링 해서 검증해보자
     */

    console.log('ObjectId 검증 미들웨어 자동!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('url: ', req.url);

    //? /:id로 시작할 때만 검증한다.
    if (req.url !== '/' && !req.url.startsWith('/?')) {
      const objectIds = req.url
        .split(/comments/)
        .map((item) => item.replace(/\//g, ''));

      //? 혹시 쿼리스트링도 제거하려면 url.replace(/\?\S*/g, '')

      objectIds.forEach((id) => {
        if (!ObjectId.isValid(id))
          throw new BadRequestException('잘못된 형식의 ID입니다.');
      });
    }

    next();
  }
}
