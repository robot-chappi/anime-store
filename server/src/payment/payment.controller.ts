import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentService } from "./payment.service";
import {ObjectId} from "mongoose"

@Controller('/api/payment')
export class PaymentController {

    constructor (
        private paymentService: PaymentService
    ) {}

    @Post('/create')
    create(@Body() dto: CreatePaymentDto) {
        return this.paymentService.create(dto)
    }

    @Post('/change/status')
    changeStatus(@Query('paymentId') paymentId: string,
                 @Query('statusCode') statusCode: number) {
        return this.paymentService.changeStatus(paymentId, statusCode)
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset: number) {
        return this.paymentService.getAll(count, offset)
    }

    @Get('/for/user/:id')
    getForUser(@Param('id') id:ObjectId) {
        return this.paymentService.getForUser(id)
    }

    @Get('/new/payments')
    getNewPayments() {
        return this.paymentService.getNewPayments()
    }

    @Get(':id')
    getOne(@Param('id') id:ObjectId) {
        return this.paymentService.getOne(id);
    }

    @Get('/search/item')
    search(@Query('query') query: string) {
        return this.paymentService.search(query)
    }
}