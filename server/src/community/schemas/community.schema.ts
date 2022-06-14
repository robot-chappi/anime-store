import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { CommentCommunity } from './comments-community.schema';


export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  @Prop()
  userId: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop()
  art: string;

  @Prop()
  socialAdd: string;

  @Prop({default: "Anime Blog"})
  hashtag: string;

  @Prop({default: 0})
  like: number;

  @Prop({default: 0})
  dislike: number;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'CommentCommunity'}]})
  comments: CommentCommunity[];
}

export const CommunitySchema = SchemaFactory.createForClass(Community);