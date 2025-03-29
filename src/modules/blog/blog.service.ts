import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../error/AppError';
import { IBlogPost, IImageFiles } from './blog.interface';
import { BlogPost } from './blog.model';
const createBlog = async (
  data: Partial<IBlogPost>,
  blogImages: IImageFiles,
) => {
  const { images } = blogImages;
  if (!images || images.length === 0) {
    throw new AppError(404, 'Blog images are required.');
  }

  const isBlogExist = await BlogPost.findOne({ title: data.title });
  if (isBlogExist) {
    throw new AppError(400, 'Blog already exist.');
  }
  data.images = images.map((image) => image.path);
  const result = await BlogPost.create(data);
  return result;
};
const getAllBlog = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogPost.find({}), query)
    .search(['title', 'category', 'subcategory'])
    .category()
    .subcategory()
    .destination()
    .filter()
    .sort()
    .paginate();

  const metadata = await blogQuery.countTotal();
  const result = await blogQuery.modelQuery;

  return {
    data: result,
    metadata,
  };
};
const getSingleBlog = async (id: string) => {
  const result = await BlogPost.findById(id);
  return result;
};

export const blogServices = {
  getAllBlog,
  getSingleBlog,
  createBlog,
};
