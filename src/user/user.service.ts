import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { Product } from '../product/schemas/product.schema'
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
   constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
   // fetch all users
   async getAllUser(): Promise<User[]> {
      const users = await this.userModel.find().exec();
      return users;
   }
   // fetch all products user
   async getAllProductsUser(userID): Promise<User[]> {
      const users = await this.userModel.find().exec();
      return users;
      //const products = await this.productModel.find().exec();
      //return products;
   }
   // Get a single user
   async getUser(userID): Promise<User> {
      const user = await this.userModel.findById(userID).exec();
      return user;
   }
   // post a single user
   async addUser(createUserDTO: CreateUserDTO): Promise<User> {
      const emailExist = await this.userModel.findOne({email: createUserDTO.email});
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
      // Verify if email exist in database
      if(!emailExist){
         const user = new this.userModel({
            name: createUserDTO.name,
            email: createUserDTO.email,
            password: hashedPassword
         });
         return await user.save();
      }
   }
   // login a signle user
   async loginUser(email, password): Promise<User> {
      const user = await this.userModel.findOne({email: email});
      if(user) {
         // Compare passwords
         const validPassword = await bcrypt.compare(password, user.password)
         if(validPassword) {
            // User exist
            return user;
         }
      }
   }
   // Edit user details
   async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
      const updatedUser = await this.userModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
      return updatedUser;
   }
   // Delete a user
   async deleteUser(userID): Promise<any> {
      const deletedUser = await this.userModel.findByIdAndRemove(userID);
      return deletedUser;
   }
}