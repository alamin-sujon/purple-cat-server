export interface IBlogPost {
  title: string;
  tags: string[];
  shortDescription: string;
  content: string;
  category: string;
  subcategory: string;
  author: {
    name: string;
    profilePicture: string;
  };
  publishedDate: Date;
  likes: number;
  views: number;
  isBookmarked: boolean;
  images: string[];
}

export type IImageFiles = Record<string, Express.Multer.File[]>;

export interface IImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}
