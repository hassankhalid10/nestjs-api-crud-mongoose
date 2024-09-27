// Import necessary decorators and modules from NestJS
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Import the Blog model interface
import { Blog } from './blog.model';

// Define a service class for handling blog-related operations
@Injectable()
export class BlogsService {
  constructor(
    // Inject the 'Blog' model from the MongooseModule
    @InjectModel('Blog') private readonly blogModel: Model<Blog>,
  ) {}

  // Method for inserting a new blog into the database
  async insertBlog(title: string, desc: string, price: number) {
    const newBlog = new this.blogModel({
      title,
      description: desc,
      price,
    });
    const result = await newBlog.save();
    return result.id as string;
  }

  // Method for fetching all blogs from the database
  async getBlogs() {
    const blogs = await this.blogModel.find().exec();
    return blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      description: blog.description,
      price: blog.price,
    }));
  }

  // Method for fetching a single blog by ID from the database
  async getSingleBlog(blogId: string) {
    const blog = await this.findBlog(blogId);
    return {
      id: blog.id,
      title: blog.title,
      description: blog.description,
      price: blog.price,
    };
  }

  // Method for updating a blog by ID in the database
  async updateBlog(blogId: string, title: string, desc: string, price: number) {
    const updatedBlog = await this.findBlog(blogId);
    if (title) {
      updatedBlog.title = title;
    }
    if (desc) {
      updatedBlog.description = desc;
    }
    if (price) {
      updatedBlog.price = price;
    }
    updatedBlog.save();
  }

  // Method for deleting a blog by ID from the database
  async deleteBlog(blogId: string) {
    const result = await this.blogModel.deleteOne({ _id: blogId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find blog.');
    }
  }

  // Private method to find a blog by ID and handle exceptions if not found
  private async findBlog(id: string): Promise<Blog> {
    let blog;
    try {
      blog = await this.blogModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find blog.');
    }
    if (!blog) {
      throw new NotFoundException('Could not find blog.');
    }
    return blog;
  }
}