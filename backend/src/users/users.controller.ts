import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReadOnlyUserDto } from 'src/users/dto/user.dto';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ description: '성공', type: ReadOnlyUserDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: string; email: string; nickname: string }> {
    return await this.usersService.create(createUserDto);
  }

  @Post(':id')
  login(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
