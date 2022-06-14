import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FileService, FileType } from "src/files/file.service";
import { Payment, PaymentDocument } from "./schemas/payment.schema";
import {Model, ObjectId} from "mongoose"
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentService {

    constructor(
        @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
        private fileService: FileService
    ) {}

    async create(dto: CreatePaymentDto): Promise<Payment> {
        try {
            const newPayment = await this.paymentModel.create({...dto});
            return newPayment;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(count = 30, offset = 0): Promise<Payment[]> {
        try {
            const payments = await this.paymentModel.find().skip(Number(offset)).limit(Number(count));
            return payments;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<Payment> {
        try {
            const payment = await this.paymentModel.findById(id);
            return payment;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async search(query: string): Promise<Payment[]> {
        try {
            const payments = await this.paymentModel.find({
                name: {$regex: new RegExp(query, 'i')}
            })
            return payments;
        } catch (e) {
            throw new HttpException("Что-то пошло не так...", HttpStatus.BAD_REQUEST)
        }
    }

    async changeStatus(paymentId: string, statusCode: number): Promise<any> {
        try {
            const payment = await this.paymentModel.findById(paymentId);

            if(statusCode == 100) {
                payment.set({
                    status: "Flying to you"
                })
                return await payment.save();
            }

            if(statusCode == 200) {
                payment.set({
                    status: "Completed"
                })
                return await payment.save();
            }

            return {
                message: "Error"
            }

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST) 
        }
    }

    async getNewPayments(): Promise<Payment[]> {
        try {
            const payments = await this.paymentModel.find().sort({_id:-1}).limit(15)
            return payments;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST) 
        }
    }

    async getForUser(id: ObjectId): Promise<Payment[]> {
        try {
            const payments = await this.paymentModel.find({userId: id});
            return payments;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }
}