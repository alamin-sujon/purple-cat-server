"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogPost = void 0;
const mongoose_1 = require("mongoose");
const BlogPostSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.BlogPost = (0, mongoose_1.model)('BlogPost', BlogPostSchema);
