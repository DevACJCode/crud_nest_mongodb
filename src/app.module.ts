import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
