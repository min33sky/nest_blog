import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from 'src/users/users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'nickname',
] as const) {
  @ApiProperty({
    example: '61066649d94d3a326843082c',
    description: 'id',
  })
  id: string;
}
