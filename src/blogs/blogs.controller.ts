// Import necessary decorators and modules from NestJS
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

// Import the BlogsService to access its functions
import { BlogsService } from './blogs.service';

// Define a controller class for handling HTTP requests related to blogs
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {
    // Initialize the controller with the BlogsService through dependency injection
  }

  // Define a route that handles HTTP POST requests to create a new blog
  @Post()
  async addBlog(
    @Body('title') blogTitle: string,
    @Body('description') blogDesc: string,
    @Body('price') blogPrice: number,
  ) {
    // Call the insertBlog method from BlogsService to add a new blog
    const generatedId = await this.blogsService.insertBlog(
      blogTitle,
      blogDesc,
      blogPrice,
    );
    return { id: generatedId }; // Return the ID of the newly created blog
  }

  // Define a route that handles HTTP GET requests to fetch all blogs
  @Get()
  async getAllBlogs() {
    // Call the getBlogs method from BlogsService to retrieve all blogs
    const blogs = await this.blogsService.getBlogs();
    return blogs; // Return the list of blogs
  }

  // Define a route that handles HTTP GET requests to fetch a single blog by ID
  @Get(':id')
  getBlog(@Param('id') blogId: string) {
    // Call the getSingleBlog method from BlogsService to retrieve a specific blog
    return this.blogsService.getSingleBlog(blogId);
  }

  // Define a route that handles HTTP PATCH requests to update a blog by ID
  @Patch(':id')
  async updateBlog(
    @Param('id') blogId: string,
    @Body('title') blogTitle: string,
    @Body('description') blogDesc: string,
    @Body('price') blogPrice: number,
  ) {
    // Call the updateBlog method from BlogsService to update a specific blog
    await this.blogsService.updateBlog(blogId, blogTitle, blogDesc, blogPrice);
    return null; // Return null to indicate success
  }

  // Define a route that handles HTTP DELETE requests to remove a blog by ID
  @Delete(':id')
  async removeBlog(@Param('id') blogId: string) {
    // Call the deleteBlog method from BlogsService to delete a specific blog
    await this.blogsService.deleteBlog(blogId);
    return null; // Return null to indicate success
  }
}


//routes
//get    http://localhost:3000/blogs
//post   http://localhost:3000/blogs
//get    http://localhost:3000/blogs/id
//patch  http://localhost:3000/blogs/id
//delete http://localhost:3000/blogs/id