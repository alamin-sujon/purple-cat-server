import { model, Schema } from 'mongoose';
import { IBlogPost } from './blog.interface';

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    tags: { type: [String], required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      profilePicture: { type: String },
    },
    publishedDate: { type: Date, default: Date.now },
    likes: { type: Number, default: 40 },
    views: { type: Number, default: 60 },
    isBookmarked: { type: Boolean, default: false },
    images: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const BlogPost = model<IBlogPost>('BlogPost', BlogPostSchema);
