import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ClothingService } from "./clothing.service";
import { CreateClothingDto } from "./dto/create-clothing.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import {ObjectId} from "mongoose"
import { DeleteCommentDto } from "./dto/delete-comment.dto";

@Controller('/api/clothing')
export class ClothingController {
    constructor (
        private clothingService: ClothingService
    ) {}
    
    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: CreateClothingDto) {
        const {picture} = files
        return this.clothingService.create(dto, picture[0]);
    }

    @Post('/add/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.clothingService.addComment(dto);
    }

    @Delete('/delete/comment')
    deleteComment(@Body() dto: DeleteCommentDto) {
        return this.clothingService.deleteComment(dto);
    }

    @Delete('/delete/comment/all/:id')
    deleteCommentAll(@Param('id') id:ObjectId) {
        return this.clothingService.deleteCommentAll(id);
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number,
           @Query('type') type: number
           ) {
        return this.clothingService.getAll(count, offset, type)
    }

    @Get(':id')
    getOne(@Param('id') id:ObjectId) {
        return this.clothingService.getOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id:ObjectId) {
        return this.clothingService.delete(id);
    }

    @Get('/search/item')
    search(@Query('query') query: string) {
        return this.clothingService.search(query)
    }

    @Post('/like/:id')
    like(@Param('id') id: ObjectId) {
        return this.clothingService.like(id)
    }

    @Post('/dislike/:id')
    dislike(@Param('id') id: ObjectId) {
        return this.clothingService.dislike(id)
    }
}