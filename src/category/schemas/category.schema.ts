import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';

export type CategoryDocument = Category & Document;
 
@Schema()
export class Category {
   @Transform(({ value }) => value.toString())
   _id: ObjectId;
   
   @Prop()
   name: string;

   @Prop()
   description: string;

   @Prop({ type: Date, default: Date.now })
   @Type(() => Date)
   created_at: Date;

   @Prop({ type: Date, default: Date.now })
   @Type(() => Date)
   modified_at: Date;
}
 
export const CategorySchema = SchemaFactory.createForClass(Category);