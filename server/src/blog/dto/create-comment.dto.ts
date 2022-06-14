import {ObjectId} from "mongoose";

export class CreateCommentBlogDto {
    readonly userId: string;
    readonly username: string;
    readonly avatar: string;
    readonly text: string;
    readonly rating: number;
    readonly blogId: ObjectId;
}