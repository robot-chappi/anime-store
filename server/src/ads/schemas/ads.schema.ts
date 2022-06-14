import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';


export type AdsDocument = Ads & Document;

@Schema()
export class Ads {

  @Prop()
  name: string;

  @Prop()
  type: number;

  @Prop()
  image: string;

  @Prop({ type: Date, default: Date.now })
  time: Date;

}

export const AdsSchema = SchemaFactory.createForClass(Ads);