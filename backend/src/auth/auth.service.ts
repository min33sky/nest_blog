import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/auth/jwt/jwt.payload';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * Login to use JWT
   * @param loginRequestDto
   * @returns authentication token
   */
  async jwtLogin(
    loginRequestDto: LoginRequestDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = loginRequestDto;

    //* 이메일이 존재하는지 확인
    const user = await this.userRepository.findUserByEmail(email);

    if (!user)
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');

    //* 패스워드가 일치하는지 확인
    const isPasswordValidated: boolean = await bcrypt.compareSync(
      password,
      user.password,
    );

    if (!isPasswordValidated)
      throw new UnauthorizedException('이메일과 비밀번호를 확인하세요.');

    const payload: Payload = { email: email, sub: user.id }; //? sub: 토큰 제목

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
