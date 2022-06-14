import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type BasketDocument = Basket & Document;

@Schema()
export class Basket {
  @Prop()
  clothingId: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  clothing: User;

}

export const BasketSchema = SchemaFactory.createForClass(Basket);