import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { CommunityController } from "./community.controller";
import { CommunityService } from "./community.service";
import { CommentCommunity, CommentCommunitySchema } from "./schemas/comments-community.schema";
import { Community, CommunitySchema } from "./schemas/community.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Community.name, schema: CommunitySchema}]),
        MongooseModule.forFeature([{name: CommentCommunity.name, schema: CommentCommunitySchema}]),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),

    ],
    controllers: [CommunityController],
    providers: [CommunityService, FileService]
})

export class CommunityModule {}