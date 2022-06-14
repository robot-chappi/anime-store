import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Community, CommunityDocument } from "./schemas/community.schema";
import {Model, ObjectId} from "mongoose"
import { CommentCommunity, CommentCommunityDocument } from "./schemas/comments-community.schema";
import { FileService, FileType } from "src/files/file.service";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { CreateCommentCommunityDto } from "./dto/create-comment-community.dto";
import { DeleteCommentCommunityDto } from "./dto/delete-comment.dto";
import { User, UserDocument } from "src/users/schemas/user.schema";

@Injectable()
export class CommunityService {
    constructor (
        @InjectModel(Community.name) private communityModel: Model<CommunityDocument>,
        @InjectModel(CommentCommunity.name) private commentCommunityModel: Model<CommentCommunityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreateCommunityDto, art): Promise<Community> {
        try {
            const picturePath = this.fileService.createFile(FileType.COMMUNITY, art);
            const newCommunity = await this.communityModel.create({...dto, art: picturePath});
            return newCommunity;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addComment(dto: CreateCommentCommunityDto): Promise<CommentCommunity> {
        try {
            const community = await this.communityModel.findById(dto.communityId);
            const comment = await this.commentCommunityModel.create({...dto})
            community.comments.push(comment._id)
            await community.save();
            return comment;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(count = 10, offset = 0): Promise<Community[]> {
        try {
            const communitys = await this.communityModel.find().skip(Number(offset)).limit(Number(count));
            return communitys;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<any> {
        try {
            const community = await this.communityModel.findById(id).populate('comments');
            const user = await this.userModel.findById(community.userId)
            const result = {community: community, user: user}
            return result;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        try {
            const community = await this.communityModel.findByIdAndDelete(id);
            return community._id
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        } 
    }

    async deleteComment(dto: DeleteCommentCommunityDto): Promise<any> {
        try {
            const removeItem = await this.communityModel.findOneAndUpdate(
                {
                    _id: dto.communityId
                },
                {
                    $pull: {
                        comments: dto.commentId
                    }
                }
            )
            await this.commentCommunityModel.deleteOne({_id: dto.commentId})

            return removeItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteCommentAll(id: ObjectId): Promise<any> {
        try {
            const removeItems = await this.communityModel.findById(id)
            await this.commentCommunityModel.deleteMany({_id: removeItems['comments']})
            removeItems.set({
                comments: []
            })
            await removeItems.save()

            return {
                message: "Success!"
            };

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(query: string): Promise<Community[]> {
        try {
            const comments = await this.communityModel.find({
                hashtag: {$regex: new RegExp(query, 'i')}
            })
            return comments;
        } catch (e) {
            throw new HttpException("Что-то пошло не так...", HttpStatus.BAD_REQUEST)
        }
    }

    async like(id: ObjectId) {
        const community = await this.communityModel.findById(id);
        community.like += 1
        community.save();
    }

    async dislike(id: ObjectId) {
        const community = await this.communityModel.findById(id);
        community.dislike += 1
        community.save();
    }
}