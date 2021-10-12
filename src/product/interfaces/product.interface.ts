import { Document } from 'mongoose';

export interface Product extends Document {
   readonly nameProduct: string,
   readonly sku: string,
   readonly price: number,
   readonly quantity: number,
   readonly created_at: Date;
   readonly modified_at: Date;
}