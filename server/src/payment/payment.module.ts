import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "src/files/file.service";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { Payment, PaymentSchema } from "./schemas/payment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Payment.name, schema: PaymentSchema}])
    ],
    controllers: [PaymentController],
    providers: [PaymentService, FileService]
})

export class PaymentModule {}