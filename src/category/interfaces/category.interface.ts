import { Document } from 'mongoose';

export interface Category extends Document {
   readonly name: string;
   readonly description: string;
   readonly created_at: Date;
   readonly modified_at: Date;
}