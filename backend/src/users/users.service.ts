import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; email: string; nickname: string }> {
    const { email, nickname, password } = createUserDto;

    //* 이미 존재하는 회원인지 확인
    const isExist = await this.userRepository.existsByEmail(email);
    if (isExist) throw new UnauthorizedException('이미 존재하는 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    //* 회원가입 하고 응답
    const user = await this.userRepository.createUser({
      email,
      nickname,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
