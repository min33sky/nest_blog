import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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
  @IsArray()
  @Prop()
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
