
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products') // This sets the base route for this controller to /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // This endpoint handles adding a new product
  @Post()
  async addProduct(
    @Body('title') prodTitle: string, // Extracts the title from the request body
    @Body('description') prodDesc: string, // Extracts the description from the request body
    @Body('price') prodPrice: number, // Extracts the price from the request body
  ) {
    // Calls the service method to insert the product and waits for the generated ID
    const generatedId = await this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    // Returns the generated product ID
    return { id: generatedId };
  }

  // This endpoint retrieves all products
  @Get()
  async getAllProducts() {
    // Calls the service method to get all products and waits for the result
    const products = await this.productsService.getProducts();
    // Returns the list of products
    return products;
  }

  // This endpoint retrieves a single product by its ID
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    // Calls the service method to get a single product by its ID
    return this.productsService.getSingleProduct(prodId);
  }

  // This endpoint updates an existing product by its ID
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string, // Gets the product ID from the route parameter
    @Body('title') prodTitle: string, // Gets the new title from the request body
    @Body('description') prodDesc: string, // Gets the new description from the request body
    @Body('price') prodPrice: number, // Gets the new price from the request body
  ) {
    // Calls the service method to update the product with the new details
    await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null; // Returns nothing upon success
  }

  // This endpoint removes a product by its ID
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    // Calls the service method to delete the product by its ID
    await this.productsService.deleteProduct(prodId);
    return null; // Returns nothing upon success
  }
}


//routes
//get  http://localhost:3000/products
//post  http://localhost:3000/products
//get  http://localhost:3000/products/id
//patch http://localhost:3000/products/id
//delete http://localhost:3000/products/id