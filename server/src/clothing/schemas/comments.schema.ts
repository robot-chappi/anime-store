import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Clothing } from './clothing.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  avatar: string;

  @Prop()
  text: string;

  @Prop()
  rating: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Clothing'})
  clothing: Clothing;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);