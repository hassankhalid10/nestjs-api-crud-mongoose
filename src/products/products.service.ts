import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

// This service handles product-related operations.
@Injectable()
export class ProductsService {
  // Inject the Product model to interact with the database.
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Add a new product to the database.
  async insertProduct(title: string, desc: string, price: number) {
    // Create a new product instance with the provided title, description, and price.
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });
    // Save the new product to the database and return its ID.
    const result = await newProduct.save();
    return result.id as string;
  }

  // Retrieve all products from the database.
  async getProducts() {
    // Fetch all products and return them in a simplified format.
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  // Get details of a single product by its ID.
  async getSingleProduct(productId: string) {
    // Find the product by its ID and return its details.
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  // Update the details of an existing product.
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    // Find the product to be updated.
    const updatedProduct = await this.findProduct(productId);
    
    // Update the title, description, and price if provided.
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    
    // Save the changes to the product.
    updatedProduct.save();
  }

  // Delete a product from the database by its ID.
  async deleteProduct(prodId: string) {
    // Attempt to delete the product from the database.
    const result = await this.productModel.deleteOne({ _id: prodId }).exec();
    
    // If no product was deleted, throw an error.
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
  }

  // Helper method to find a product by its ID.
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      // Try to find the product by its ID.
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      // If an error occurs, throw a 'not found' exception.
      throw new NotFoundException('Could not find product.');
    }
    
    // If the product is not found, throw an exception.
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    
    // Return the found product.
    return product;
  }
}
