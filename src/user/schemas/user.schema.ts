import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Product } from '../../product/schemas/product.schema';
 
export type UserDocument = User & Document;
 
@Schema()
export class User {
   @Transform(({ value }) => value.toString())
   _id: ObjectId;
   
   @Prop()
   name: string;

   @Prop({ unique: true })
   email: string;
   
   @Prop()
   @Exclude()
   password: string;

   @Prop({ type: Date, default: Date.now })
   @Type(() => Date)
   created_at: Date;
}
 
export const UserSchema = SchemaFactory.createForClass(User);