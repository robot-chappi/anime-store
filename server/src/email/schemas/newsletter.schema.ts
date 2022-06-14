import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsletterDocument = Newsletter & Document;

@Schema()
export class Newsletter {
  @Prop({unique: true})
  email: string;

  @Prop()
  name: string;

}

export const NewsletterSchema = SchemaFactory.createForClass(Newsletter);