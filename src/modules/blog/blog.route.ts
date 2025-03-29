import { Router } from 'express';
import { blogControllers } from './blog.controller';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';

const route = Router();

route.post(
  '/',
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  blogControllers.createBlog,
);
route.get('/', blogControllers.getAllblog);
route.get('/:blogId', blogControllers.getSingleBlog);

export const blogRoute = route;
