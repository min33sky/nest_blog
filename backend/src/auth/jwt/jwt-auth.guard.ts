import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 가드가 호출될 시 jwtStrategy를 실행시킨다.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
