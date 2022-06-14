import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { CommentBlog } from './comment.schema';


export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({default: "Anime Blog"})
  seo: string;

  @Prop({default: 0})
  like: number;

  @Prop({default: 0})
  dislike: number;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'CommentBlog'}]})
  comments: CommentBlog[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);