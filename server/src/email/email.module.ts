import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { join } from "path";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { Newsletter, NewsletterSchema } from "./schemas/newsletter.schema";

@Module({
    imports: [

        MailerModule.forRoot({
            transport: {
                host: 'smtp.mail.ru',
                secure: false,
                auth: {
                  user: 'anime-store-supper@mail.ru',
                  pass: '9wZcUdEciV5R1Ya0n7G9',
                },
                tls: {rejectUnauthorized: false}
              },
              defaults: {
                from: 'Anime Shop <anime-store-supper@mail.ru>',
              },
              template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
              },
        }),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Newsletter.name, schema: NewsletterSchema}]),
        
    ],
    controllers: [EmailController],
    providers: [EmailService]
})

export class EmailModule {}

