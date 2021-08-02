import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import * as mongoose from 'mongoose';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

export class Writer {
  _id: mongoose.Types.ObjectId;
  email: string;
  nickname: string;
}

@Schema(options)
export class Post extends Document {
  @ApiProperty({
    example: '오늘의 하루는?',
    description: 'Post Title',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: '개같았다 이말이야',
    description: 'Post Content',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  content: string;

  @ApiProperty({
    example: ['일상', '자랑', '일기'],
    description: 'Tag',
    required: false,
  })
  @IsString({ each: true }) //? stringp[] 검증
  @Prop([String])
  tags: string[];

  @ApiProperty({
    description: '작성자 정보',
  })
  @Prop(Writer)
  user: Writer;
}

export const PostSchema = SchemaFactory.createForClass(Post);
