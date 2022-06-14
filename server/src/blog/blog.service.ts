import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Blog, BlogDocument } from "./schemas/blog.schema";
import {Model, ObjectId} from "mongoose"
import { CommentBlog, CommentBlogDocument } from "./schemas/comment.schema";
import { FileService, FileType } from "src/files/file.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { CreateCommentBlogDto } from "./dto/create-comment.dto";
import { DeleteCommentBlogDto } from "./dto/delete-comment.dto";

@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        @InjectModel(CommentBlog.name) private commentBlogModel: Model<CommentBlogDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreateBlogDto, image): Promise<Blog> {
        try {
            const picturePath = this.fileService.createFile(FileType.BLOG, image);
            const newBlog = await this.blogModel.create({...dto, image: picturePath});
            return newBlog;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addComment(dto: CreateCommentBlogDto): Promise<CommentBlog> {
        try {
            const blog = await this.blogModel.findById(dto.blogId);
            const comment = await this.commentBlogModel.create({...dto})
            blog.comments.push(comment._id)
            await blog.save();
            return comment;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(count = 10, offset = 0): Promise<Blog[]> {
        try {
            const blogs = await this.blogModel.find().skip(Number(offset)).limit(Number(count));
            return blogs;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<Blog> {
        try {
            const blogs = await this.blogModel.findById(id).populate('comments');
            return blogs;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        try {
            const blog = await this.blogModel.findByIdAndDelete(id);
            return blog._id
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        } 
    }

    async deleteComment(dto: DeleteCommentBlogDto): Promise<any> {
        try {
            const removeItem = await this.blogModel.findOneAndUpdate(
                {
                    _id: dto.blogId
                },
                {
                    $pull: {
                        comments: dto.commentId
                    }
                }
            )
            await this.commentBlogModel.deleteOne({_id: dto.commentId})

            return removeItem;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async deleteCommentAll(id: ObjectId): Promise<any> {
        try {
            const removeItems = await this.blogModel.findById(id)
            await this.commentBlogModel.deleteMany({_id: removeItems['comments']})
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

    async search(query: string): Promise<Blog[]> {
        try {
            const blogs = await this.blogModel.find({
                title: {$regex: new RegExp(query, 'i')}
            })
            return blogs;
        } catch (e) {
            throw new HttpException("Что-то пошло не так...", HttpStatus.BAD_REQUEST)
        }
    }

    async like(id: ObjectId) {
        const blog = await this.blogModel.findById(id);
        blog.like += 1
        blog.save();
    }

    async dislike(id: ObjectId) {
        const blog = await this.blogModel.findById(id);
        blog.dislike += 1
        blog.save();
    }
}