import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class CreateUserDto extends PickType(User, [
  'email',
  'nickname',
  'password',
] as const) {}
