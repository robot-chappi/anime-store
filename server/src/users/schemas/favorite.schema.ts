import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop()
  favoriteId: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  favorite: User;

}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);