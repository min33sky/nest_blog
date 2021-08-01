import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { Payload } from 'src/auth/jwt/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //? Authorization 헤더의 Bearer [token값]에서 JWT 추출
      ignoreExpiration: false, //? 만료 기간 무시 여부
      secretOrKey: process.env.JWT_SECRET, //? 비밀키
    });
  }

  async validate(payload: Payload) {
    console.log('===============================================');
    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (user) {
      return user; //* passport에서 req.user에 유저 정보 저장
    } else {
      throw new UnauthorizedException('접근 불가');
    }
  }
}
