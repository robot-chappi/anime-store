import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { ClothingController } from "./clothing.controller";
import { ClothingService } from "./clothing.service";
import { Clothing, ClothingSchema } from "./schemas/clothing.schema";
import { Comment, CommentSchema } from "./schemas/comments.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Clothing.name, schema: ClothingSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}])
    ],
    controllers: [ClothingController],
    providers: [ClothingService, FileService]
})

export class ClothingModule {}