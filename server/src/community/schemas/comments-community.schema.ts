import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Community } from './community.schema';

export type CommentCommunityDocument = CommentCommunity & Document;

@Schema()
export class CommentCommunity {
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

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Community'})
  community: Community;

}

export const CommentCommunitySchema = SchemaFactory.createForClass(CommentCommunity);