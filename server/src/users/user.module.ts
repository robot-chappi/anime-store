import { Module } from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose"
import { FileService } from "src/files/file.service";
import { Basket, BasketSchema } from "./schemas/basket.schema";
import { Favorite, FavoriteSchema } from "./schemas/favorite.schema";
import { User, UserSchema } from "./schemas/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants/constants";
import { Clothing, ClothingSchema } from "src/clothing/schemas/clothing.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
        MongooseModule.forFeature([{name: Favorite.name, schema: FavoriteSchema}]),
        MongooseModule.forFeature([{name: Clothing.name, schema: ClothingSchema}]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        }),
    ],
    controllers: [UserController],
    providers: [UserService, FileService],
    exports: [UserService]
})
export class UserModule {}