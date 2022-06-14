import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Clothing, ClothingSchema } from "src/clothing/schemas/clothing.schema";
import { FileService } from "src/files/file.service";
import { jwtConstants } from "src/users/constants/constants";
import { Basket, BasketSchema } from "src/users/schemas/basket.schema";
import { Favorite, FavoriteSchema } from "src/users/schemas/favorite.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UserModule } from "src/users/user.module";
import { UserService } from "src/users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
        MongooseModule.forFeature([{name: Favorite.name, schema: FavoriteSchema}]),
        MongooseModule.forFeature([{name: Clothing.name, schema: ClothingSchema}]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '30d'}
        }),
        UserModule,
        PassportModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, FileService, LocalStrategy, JwtStrategy]
})

export class AuthModule {}