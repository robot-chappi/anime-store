import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comments.schema';



export type ClothingDocument = Clothing & Document;

@Schema()
export class Clothing {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  brand: string;

  @Prop()
  type: number;

  @Prop()
  delivery: string;

  @Prop()
  care: string;

  @Prop()
  price: number;

  @Prop()
  color: string[];

  @Prop()
  size: string[];

  @Prop()
  picture: string;

  @Prop({default: 0})
  like: number;

  @Prop({default: 0})
  dislike: number;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[];

}

export const ClothingSchema = SchemaFactory.createForClass(Clothing);