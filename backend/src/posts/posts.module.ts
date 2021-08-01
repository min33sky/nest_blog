import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateObjectIdMiddleware } from 'src/posts/middlewares/validate-object-id.middleware';
import { PostsRepository } from 'src/posts/posts.repository';
import { Post, PostSchema } from 'src/posts/schemas/posts.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateObjectIdMiddleware).forRoutes('/api/posts');
  }
}
