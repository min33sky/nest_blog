import { PickType } from '@nestjs/swagger';
import { Post } from 'src/posts/schemas/posts.schema';

export class CreatePostDto extends PickType(Post, [
  'title',
  'content',
  'tags',
] as const) {}
