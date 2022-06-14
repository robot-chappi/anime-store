import {ObjectId} from "mongoose";

export class CreateCommentDto {
    readonly userId: string;
    readonly username: string;
    readonly avatar: string;
    readonly text: string;
    readonly rating: number;
    readonly clothingId: ObjectId;
}