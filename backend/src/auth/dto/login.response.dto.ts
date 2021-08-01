import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    example: 'dgasklj1231ssalbsadf',
    description: 'JWT',
  })
  token: string;
}
