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
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedFields = void 0;
exports.excludedFields = [
    'searchTerm',
    'category',
    'subcategory',
    'destination',
    'limit',
    'sort',
    'page',
];
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((el) => {
                    var _a;
                    return ({
                        [el]: { $regex: (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm, $options: 'i' },
                    });
                }),
            });
        }
        return this;
    }
    category() {
        var _a, _b;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.category) {
            this.modelQuery = this.modelQuery.find({
                category: (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.category,
            });
        }
        return this;
    }
    subcategory() {
        var _a, _b;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.subcategory) {
            this.modelQuery = this.modelQuery.find({
                subcategory: (_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.subcategory,
            });
        }
        return this;
    }
    destination() {
        var _a;
        if ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.destination) {
            this.modelQuery = this.modelQuery.find({
                tags: { $in: [this.query.destination] },
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        exports.excludedFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);
        for (const key in queryObj) {
            if (queryObj[key] === 'null') {
                delete queryObj[key];
            }
        }
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a;
        const sort = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 9;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const totalQueries = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(totalQueries);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 9;
            const totalPage = Math.ceil(total / limit);
            return {
                page,
                limit,
                total,
                totalPage,
            };
        });
    }
}
exports.default = QueryBuilder;
