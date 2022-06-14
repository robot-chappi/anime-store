import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Basket } from './basket.schema';
import { Favorite } from './favorite.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique: true, NaN: false})
  email: string;

  @Prop({NaN: false})
  password: string;

  @Prop({default: "USER"})
  role: string;

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  back: string;

  @Prop({default: "Null"})
  about: string;

  @Prop({default: "Null"})
  social: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Favorite'}]})
  favorite: Favorite[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Basket'}]})
  basket: Basket[];
}

export const UserSchema = SchemaFactory.createForClass(User);