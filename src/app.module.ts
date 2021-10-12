import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, { useNewUrlParser: true }),
    UserModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
