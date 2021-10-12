import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
   constructor(private productService: ProductService) { }

   // add a product
   @Post('/create/:author/:category')
   async addProduct(@Res() res, @Param('author') author, @Param('category') category, @Body() createProductDTO: CreateProductDTO) {
      const product = await this.productService.addProduct(createProductDTO, author, category);
      return res.status(HttpStatus.OK).json({
         message: "Product has been created successfully",
         product
      })
   }
   // Retrieve products list
   @Get('products')
   async getAllProduct(@Res() res) {
      const products = await this.productService.getAllProduct();
      return res.status(HttpStatus.OK).json(products);
   }
   // Retrieve products list with user ID
   @Get('products/:userID')
   async getAllUserProduct(@Res() res, @Param('userID') userID) {
      const products = await this.productService.getAllUserProduct(userID);
      return res.status(HttpStatus.OK).json(products);
   }
   // Fetch a particular product using ID
   @Get('product/:productID')
   async getProduct(@Res() res, @Param('productID') productID) {
      const product = await this.productService.getProduct(productID);
      if (!product) throw new NotFoundException('Product does not exist!');
      return res.status(HttpStatus.OK).json(product);
   }
   // Update a product's details
   @Put('/update/:productID')
   async updateProduct(@Res() res, @Param('productID') productID, @Body() createProductDTO: CreateProductDTO) {
      const product = await this.productService.updateProduct(productID, createProductDTO);
      if (!product) throw new NotFoundException('Product does not exist!');
      return res.status(HttpStatus.OK).json({
         message: 'Product has been successfully updated',
         product
      });
   }
   // Delete a product
   @Delete('/delete/:productID')
   async deleteProduct(@Res() res, @Param('productID') productID) {
      const product = await this.productService.deleteProduct(productID);
      if (!product) throw new NotFoundException('Product does not exist');
      return res.status(HttpStatus.OK).json({
         message: 'Product has been deleted',
         product
      })
   }
}

