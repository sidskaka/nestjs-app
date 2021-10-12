import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Category } from '../../category/schemas/category.schema';
import { Transform, Type } from 'class-transformer';
 
export type ProductDocument = Product & Document;
 
@Schema()
export class Product {
   @Transform(({ value }) => value.toString())
   _id: ObjectId;
   
   @Prop()
   nameProduct: string;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
   @Type(() => Category)
   category: Category;

   @Prop()
   sku: string;

   @Prop()
   price: number;
   
   @Prop()
   quantity: number;
   
   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
   @Type(() => User)
   author: User;

   @Prop({ type: Date, default: Date.now })
   @Type(() => Date)
   created_at: Date;

   @Prop({ type: Date, default: Date.now })
   @Type(() => Date)
   modified_at: Date;
}
 
export const ProductSchema = SchemaFactory.createForClass(Product);