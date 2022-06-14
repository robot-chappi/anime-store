import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";
import {Model, ObjectId} from "mongoose"
import { Newsletter, NewsletterDocument } from "./schemas/newsletter.schema";
import { CreateEmailDto } from "./dto/newsletter-create.dto";
import { join } from "path";
import { CreateAdminLetter } from "./dto/admins-create.dto";

@Injectable()
export class EmailService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Newsletter.name) private newsModel: Model<NewsletterDocument>,
        private mailerService: MailerService
    ) {}

    async create(dto: CreateEmailDto): Promise<Newsletter> {
        try {
            const subscribe = await this.newsModel.create({...dto})
            return subscribe;
        } catch (e) {
            throw new HttpException("Некорректные данные!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(email: string): Promise<any> {
        try {
            const subscriber = await this.newsModel.findOneAndDelete({email: email});
            return subscriber._id;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        } 
    }

    async getAll(count = 100, offset = 0): Promise<Newsletter[]> {
        try {
            const subscribers = await this.newsModel.find().skip(Number(offset)).limit(Number(count));
            return subscribers;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
        
    }

    async getOne(id: ObjectId): Promise<Newsletter> {
        try {
            const subscriber = await this.newsModel.findById(id);
            return subscriber;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async checking(email: string, code: number): Promise<any> {
        try {
            return await this.mailerService.sendMail({
                to: email,
                subject: 'Confirm Email',
                template: join(__dirname, 'templates/confirm'),
                context: { 
                    code,
                },
            })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async sendAdmin(dto: CreateAdminLetter): Promise<any> {
        try {
            const email = dto.email;
            const message = dto.message;
            const name = dto.name;
            await this.mailerService.sendMail({
                to: 'metachappic@gmail.com',
                subject: dto.subject,
                html: `<p>Message from <b>${name}</b></p><p>Message - ${message}</p><p>${email}</p>`
            })
            return console.log('OK')
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }


    async sendUserChange(email: string, code: string): Promise<any> {
        try {
            const user = await this.userModel.find({email: email})
            if(user) {
                return await this.mailerService.sendMail({
                    to: email,
                    subject: 'Change Password',
                    template: join(__dirname, 'templates/confirm'),
                    context: { 
                      code,
                    },
                  });
            }

            return {
                message: 'something is going wrong...'
            }
            
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }
    

    async sendToSubscribers(information: string): Promise<any> {
        try {
            const subscribers = await this.newsModel.find()
            subscribers.map((s) => {
                this.mailerService.sendMail({
                    to: s.email,
                    subject: 'New news!',
                    template: join(__dirname, 'templates/news'),
                    context: { 
                      name: s.name,
                      information,
                    },
                  });
            })
            return {
                message: information
            }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }
}
