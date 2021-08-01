import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  @ApiProperty({
    example: '오늘의 하루는?',
    description: 'Post Title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop()
  title: string;

  @ApiProperty({
    example: '개같았다 이말이야',
    description: 'Post Content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop()
  content: string;

  @ApiProperty({
    example: ['일상', '자랑', '일기'],
    description: 'Tag',
    required: false,
  })
  @IsString({ each: true }) //? stringp[] 검증
  @Prop()
  tags: string[];

  readonly readOnlyData: {
    id: string;
    title: string;
    content: string;
    tags: string[];
  };
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('readOnlyData').get(function (this: Post) {
  return {
    id: this.id,
    title: this.title,
    content: this.content,
    tags: this.tags,
  };
});
