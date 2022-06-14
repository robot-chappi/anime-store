import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from './blog.schema';


export type CommentBlogDocument = CommentBlog & Document;

@Schema()
export class CommentBlog {
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

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Blog'})
  blog: Blog;

}

export const CommentBlogSchema = SchemaFactory.createForClass(CommentBlog);