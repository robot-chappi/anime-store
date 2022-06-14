import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Clothing, ClothingDocument } from "./schemas/clothing.schema";
import {Model, ObjectId} from "mongoose"
import { Comment, CommentDocument } from "./schemas/comments.schema";
import { FileService, FileType } from "src/files/file.service";
import { CreateClothingDto } from "./dto/create-clothing.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { DeleteCommentDto } from "./dto/delete-comment.dto";

@Injectable()
export class ClothingService {

    constructor(
        @InjectModel(Clothing.name) private clothingModel: Model<ClothingDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) {}
    
    async create(dto: CreateClothingDto, picture): Promise<Clothing> {
        try {
            const picturePath = this.fileService.createFile(FileType.CLOTHING, picture);
            const newClothing = await this.clothingModel.create({...dto, picture: picturePath});
            return newClothing;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        try {
            const clothing = await this.clothingModel.findById(dto.clothingId);
            const comment = await this.commentModel.create({...dto})
            clothing.comments.push(comment._id)
            await clothing.save();
            return comment;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(count = 10, offset = 0, type = null): Promise<Clothing[]> {
        try {
            if (!type) {
                const clothings = await this.clothingModel.find().skip(Number(offset)).limit(Number(count));
                return clothings;
            }
            const clothings = await this.clothingModel.find({type: type}).skip(Number(offset)).limit(Number(count));
            return clothings;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<Clothing> {
        try {
            const clothing = await this.clothingModel.findById(id).populate('comments');
            return clothing;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        try {
            const clothing = await this.clothingModel.findByIdAndDelete(id);
            return clothing._id
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        } 
    }

    async deleteComment(dto: DeleteCommentDto): Promise<any> {
        try {
            console.log(dto.clothingId)
            const removeItem = await this.clothingModel.findOneAndUpdate(
                {
                    _id: dto.clothingId
                },
                {
                    $pull: {
                        comments: dto.commentId
                    }
                }
            )
            await this.commentModel.deleteOne({_id: dto.commentId})

            return removeItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteCommentAll(id: ObjectId): Promise<any> {
        try {
            const removeItems = await this.clothingModel.findById(id)
            await this.commentModel.deleteMany({_id: removeItems['comments']})
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

    async search(query: string): Promise<Clothing[]> {
        try {
            const clothings = await this.clothingModel.find({
                name: {$regex: new RegExp(query, 'i')}
            })
            return clothings;
        } catch (e) {
            throw new HttpException("Что-то пошло не так...", HttpStatus.BAD_REQUEST)
        }
    }

    async like(id: ObjectId) {
        const clothing = await this.clothingModel.findById(id);
        clothing.like += 1
        clothing.save();
    }

    async dislike(id: ObjectId) {
        const clothing = await this.clothingModel.findById(id);
        clothing.dislike += 1
        clothing.save();
    }
}