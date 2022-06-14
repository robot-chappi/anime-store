import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CommunityService } from "./community.service";
import { CreateCommentCommunityDto } from "./dto/create-comment-community.dto";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { DeleteCommentCommunityDto } from "./dto/delete-comment.dto";
import {ObjectId} from "mongoose"

@Controller('/api/community')
export class CommunityController {
    constructor(
        private communityService: CommunityService
    ) {}

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'art', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: CreateCommunityDto) {
        const {art} = files
        return this.communityService.create(dto, art[0]);
    }

    @Post('/add/comment')
    addComment(@Body() dto: CreateCommentCommunityDto) {
        return this.communityService.addComment(dto);
    }

    @Delete('/delete/comment')
    deleteComment(@Body() dto: DeleteCommentCommunityDto) {
        return this.communityService.deleteComment(dto);
    }

    @Delete('/delete/comment/all/:id')
    deleteCommentAll(@Param('id') id:ObjectId) {
        return this.communityService.deleteCommentAll(id);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.communityService.getAll(count, offset)
    }

    @Get(':id')
    getOne(@Param('id') id:ObjectId) {
        return this.communityService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id:ObjectId) {
        return this.communityService.delete(id);
    }

    @Get('/search/item')
    search(@Query('query') query: string) {
        return this.communityService.search(query)
    }

    @Post('/like/:id')
    like(@Param('id') id: ObjectId) {
        return this.communityService.like(id)
    }

    @Post('/dislike/:id')
    dislike(@Param('id') id: ObjectId) {
        return this.communityService.dislike(id)
    }
}