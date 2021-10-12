import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/create-product.dto';
import { User } from '../user/interfaces/user.interface';
import { Category } from '../category/interfaces/category.interface';

@Injectable()
export class ProductService {
   constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
   // fetch all products
   async getAllProduct(): Promise<Product[]> {
      const products = await this.productModel.find().populate('author').populate('category');
      return products;
   }
   // fetch all products of a user
   async getAllUserProduct(user: User): Promise<Product[]> {
      const products = await this.productModel.find({author: {_id: user}}).populate('author').populate('category');
      return products;
   }
   // Get a single product
   async getProduct(productID): Promise<Product> {
      const product = await this.productModel.findById(productID).populate('author').populate('category');
      return product;
   }
   // post a single product
   async addProduct(createProductDTO: CreateProductDTO, author: User, category: Category): Promise<Product> {
      const createdProduct = new this.productModel({
         ...createProductDTO,
         author,
         category
      });
      return createdProduct.save();
   }
   // Edit product details
   async updateProduct(productID, createProductDTO: CreateProductDTO): Promise<Product> {
      const updatedProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, { new: true });
      return updatedProduct;
   }
   // Delete a product
   async deleteProduct(productID): Promise<any> {
      const deletedProduct = await this.productModel.findByIdAndRemove(productID);
      return deletedProduct;
   }
}
