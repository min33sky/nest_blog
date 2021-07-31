import { ApiProperty, PickType } from '@nestjs/swagger';
import { Post } from 'src/posts/schemas/posts.schema';

export class PostResponseDto extends PickType(Post, [
  'title',
  'content',
  'tags',
] as const) {
  @ApiProperty({
    example: '6104f7a7dd5ac30b687cb2e3',
    description: 'id',
  })
  _id: string;

  @ApiProperty({
    example: '2021-07-31T07:11:35.885Z',
    description: 'created_at',
  })
  createdAt: string;

  @ApiProperty({
    example: '2021-07-31T15:32:55.515Z',
    description: 'updated_at',
  })
  updatedAt: string;
}
