import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';


export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {

  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  proofs: string;

  @Prop()
  email: string;

  @Prop()
  place: string;

  @Prop()
  card: string[];

  @Prop()
  price: number;

  @Prop({ type: Date, default: Date.now })
  time: Date;

  @Prop({default: "Approved"})
  status: string;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);