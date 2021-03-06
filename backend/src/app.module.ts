import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as mongoose from 'mongoose';
// import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),

    PostsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ? Logging Interceptor로 대채하였으므로 미들웨어 사용 안함
    // console.log('env: ', process.env.NODE_ENV);
    // 모든 라우터에 로그 미들웨어 적용
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', process.env.NODE_ENV === 'development');
  }
}
