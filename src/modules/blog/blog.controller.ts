import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { IImageFiles } from './blog.interface';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  console.log(req.files);
  const result = await blogServices.createBlog(
    req.body,
    req.files as IImageFiles,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog created Successfully',
    data: result,
  });
});

const getAllblog = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogServices.getAllBlog(query);
  console.log({ result });
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blogs retrieved Successfully',
    data: result?.data,
    meta: result?.metadata,
  });
});
const getSingleBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await blogServices.getSingleBlog(blogId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog retrieved Successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req, res) => {
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog updated Successfully',
    data: {},
  });
});

export const blogControllers = {
  getAllblog,
  getSingleBlog,
  createBlog,
  updateBlog,
};
