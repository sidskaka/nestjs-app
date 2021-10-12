import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
   constructor(private categoryService: CategoryService) { }
   // Retrieve categories list
   @Get('categories')
   async getAllCategory(@Res() res) {
      const categories = await this.categoryService.getAllCategory();
      return res.status(HttpStatus.OK).json(categories);
   }
   // add a category
   @Post('/create')
   async addCategory(@Res() res, @Body() createCategoryDTO: CreateCategoryDTO) {
      const category = await this.categoryService.addCategory(createCategoryDTO);
      return res.status(HttpStatus.OK).json({
         message: "Category has been created successfully",
         category
      })
   }
   // Fetch a particular category using ID
   @Get('category/:categoryID')
   async getCategory(@Res() res, @Param('categoryID') categoryID) {
      const category = await this.categoryService.getCategory(categoryID);
      if (!category) throw new NotFoundException('Category does not exist!');
      return res.status(HttpStatus.OK).json(category);
   }
   // Update a category's details
   @Put('/update/:categoryID')
   async updateCategory(@Res() res, @Param('categoryID') categoryID, @Body() createCategoryDTO: CreateCategoryDTO) {
      const category = await this.categoryService.updateCategory(categoryID, createCategoryDTO);
      if (!category) throw new NotFoundException('Category does not exist!');
      return res.status(HttpStatus.OK).json({
         message: 'Category has been successfully updated',
         category
      });
   }

   // Delete a category
   @Delete('/delete/:categoryID')
   async deleteCustomer(@Res() res, @Param('categoryID') categoryID) {
      const category = await this.categoryService.deleteCategory(categoryID);
      if (!category) throw new NotFoundException('Category does not exist');
      return res.status(HttpStatus.OK).json({
         message: 'Category has been deleted',
         category
      })
   }
}
