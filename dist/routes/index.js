"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const blog_route_1 = require("../modules/blog/blog.route");
exports.route = (0, express_1.Router)();
const modules = [{ path: '/blogs', route: blog_route_1.blogRoute }];
modules.forEach((el) => exports.route.use(el.path, el.route));
