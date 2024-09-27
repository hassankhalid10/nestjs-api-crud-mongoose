import * as mongoose from 'mongoose';
// Define a Mongoose schema for the "Blog" model with title, description, and price fields.

export const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create an interface representing the structure of a blog document.
export interface Blog extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
