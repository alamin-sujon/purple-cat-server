import { Router } from 'express';
import { blogRoute } from '../modules/blog/blog.route';

export const route = Router();
const modules = [{ path: '/blogs', route: blogRoute }];

modules.forEach((el) => route.use(el.path, el.route));
