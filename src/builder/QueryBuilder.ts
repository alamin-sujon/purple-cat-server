import { Query } from 'mongoose';

export const excludedFields = [
  'searchTerm',
  'category',
  'subcategory',
  'destination',
  'limit',
  'sort',
  'page',
];
class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((el) => ({
          [el]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }
  category() {
    if (this?.query?.category) {
      this.modelQuery = this.modelQuery.find({
        category: this?.query?.category,
      });
    }
    return this;
  }
  subcategory() {
    if (this?.query?.subcategory) {
      this.modelQuery = this.modelQuery.find({
        subcategory: this?.query?.subcategory,
      });
    }
    return this;
  }
  destination() {
    if (this?.query?.destination) {
      this.modelQuery = this.modelQuery.find({
        tags: { $in: [this.query.destination] },
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    excludedFields.forEach((el) => delete queryObj[el]);
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
    const sort = (this?.query?.sort as string) || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
