import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'dgasklj1231ssalbsadf',
    description: 'jwt',
  })
  access_token: string;
}
