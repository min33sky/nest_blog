import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReadOnlyUserDto } from 'src/users/dto/user.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/users/users.schema';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '내 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: User) {
    console.log('req.user: ', user);
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiOkResponse({ description: '성공', type: ReadOnlyUserDto })
  @Post()
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: string; email: string; nickname: string }> {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto): Promise<{ token: string }> {
    return this.authService.jwtLogin(loginRequestDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post(':id')
  logout() {
    return '로그아웃';
  }
}
