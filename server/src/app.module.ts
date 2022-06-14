import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { adsModule } from './ads/ads.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ClothingModule } from './clothing/clothing.module';
import { CommunityModule } from './community/community.module';
import { EmailModule } from './email/email.module';
import { FileModule } from './files/file.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),}),
    MongooseModule.forRoot('mongodb+srv://chappic:chappic@cluster0.n2hpe.mongodb.net/AnimeDataBase?retryWrites=true&w=majority'),
    UserModule,
    ClothingModule,
    PaymentModule,
    adsModule,
    EmailModule,
    BlogModule,
    CommunityModule,
    FileModule,
    AuthModule
  ],
})
export class AppModule {}
