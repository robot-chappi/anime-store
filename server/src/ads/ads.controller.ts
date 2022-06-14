import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { AdsService } from "./ads.service";
import { CreateAdsDto } from "./dto/create-ads.dto";
import {ObjectId} from "mongoose"

@Controller('/api/ads')
export class AdsController {

    constructor(
        private adsService: AdsService
    ) {}

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 }
      ]))
    create(@UploadedFiles() files, @Body() dto: CreateAdsDto) {
        const {image} = files
        return this.adsService.create(dto, image[0])
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.adsService.getAll(count, offset)
    }

    @Get('/for/user/:id')
    getForUser(@Param('id') id:number) {
        return this.adsService.getForUser(id)
    }

    @Delete(':id')
    delete(@Param('id') id:ObjectId) {
        return this.adsService.delete(id)
    }

}