import {ObjectId} from "mongoose";

export class CreateCommentCommunityDto {
    readonly userId: string;
    readonly username: string;
    readonly avatar: string;
    readonly text: string;
    readonly rating: number;
    readonly communityId: ObjectId;
}