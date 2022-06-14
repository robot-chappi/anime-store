import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { BlogService } from "./blog.service";
import { CreateBlogDto } from "./dto/create-blog.dto";
import { CreateCommentBlogDto } from "./dto/create-comment.dto";
import { DeleteCommentBlogDto } from "./dto/delete-comment.dto";
import {ObjectId} from "mongoose"

@Controller('/api/blog')
export class BlogController {
    constructor (
        private blogService: BlogService
    ) {}

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: CreateBlogDto) {
        const {image} = files
        return this.blogService.create(dto, image[0]);
    }

    @Post('/add/comment')
    addComment(@Body() dto: CreateCommentBlogDto) {
        return this.blogService.addComment(dto);
    }

    @Delete('/delete/comment')
    deleteComment(@Body() dto: DeleteCommentBlogDto) {
        return this.blogService.deleteComment(dto);
    }

    @Delete('/delete/comment/all/:id')
    deleteCommentAll(@Param('id') id:ObjectId) {
        return this.blogService.deleteCommentAll(id);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.blogService.getAll(count, offset)
    }

    @Get(':id')
    getOne(@Param('id') id:ObjectId) {
        return this.blogService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id:ObjectId) {
        return this.blogService.delete(id);
    }

    @Get('/search/item')
    search(@Query('query') query: string) {
        return this.blogService.search(query)
    }

    @Post('/like/:id')
    like(@Param('id') id: ObjectId) {
        return this.blogService.like(id)
    }

    @Post('/dislike/:id')
    dislike(@Param('id') id: ObjectId) {
        return this.blogService.dislike(id)
    }
}