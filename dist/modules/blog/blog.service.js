"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../error/AppError"));
const blog_model_1 = require("./blog.model");
const createBlog = (data, blogImages) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = blogImages;
    if (!images || images.length === 0) {
        throw new AppError_1.default(404, 'Blog images are required.');
    }
    const isBlogExist = yield blog_model_1.BlogPost.findOne({ title: data.title });
    if (isBlogExist) {
        throw new AppError_1.default(400, 'Blog already exist.');
    }
    data.images = images.map((image) => image.path);
    const result = yield blog_model_1.BlogPost.create(data);
    return result;
});
const getAllBlog = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.BlogPost.find({}), query)
        .search(['title', 'category', 'subcategory'])
        .category()
        .subcategory()
        .destination()
        .filter()
        .sort()
        .paginate();
    const metadata = yield blogQuery.countTotal();
    const result = yield blogQuery.modelQuery;
    return {
        data: result,
        metadata,
    };
});
const getSingleBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.BlogPost.findById(id);
    return result;
});
exports.blogServices = {
    getAllBlog,
    getSingleBlog,
    createBlog,
};
