import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateEmailDto } from "./dto/newsletter-create.dto";
import { EmailService } from "./email.service";
import {ObjectId} from "mongoose"
import { CreateAdminLetter } from "./dto/admins-create.dto";

@Controller('/api/email')
export class EmailController {
    
    constructor(
        private emailService: EmailService
    ) {}

    @Post('/subscribe')
    create(@Body() dto: CreateEmailDto) {
        return this.emailService.create(dto)
    }

    @Post('/checking/email')
    checking(@Query('email') email: string,
                @Query('code') code: number) {
        return this.emailService.checking(email, code)
    }

    @Delete('/unsubscribe/:email')
    delete(@Param('email') email:string) {
        return this.emailService.delete(email)
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.emailService.getAll(count, offset)
    }

    @Post('/send/admins')
    sendAdmin(@Body() dto: CreateAdminLetter) {
        return this.emailService.sendAdmin(dto)
    }

    @Get(':id')
    getOne(@Param('id') id:ObjectId) {
        return this.emailService.getOne(id);
    }

    @Post('/send/message')
    sendToSubscribers(@Body() information: string) {
        return this.emailService.sendToSubscribers(information['information'])
    }

    @Post('/send/change/password')
    sendToChange(@Body() email: string,
                 @Body() code: string,
    ) {
        return this.emailService.sendUserChange(email['email'], code['code'])
    }

}