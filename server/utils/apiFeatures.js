/**
 * API Features - Search, Filter, Sort, Pagination
 */
export class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /**
   * Search functionality
   */
  search(fields = ['title', 'description']) {
    const keyword = this.queryStr.keyword
      ? {
          $or: fields.map((field) => ({
            [field]: {
              $regex: this.queryStr.keyword,
              $options: 'i',
            },
          })),
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  /**
   * Filter by fields
   */
  filter() {
    const queryCopy = { ...this.queryStr };
    
    // Remove specific fields from filter
    const removeFields = ['keyword', 'page', 'limit', 'sort'];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  /**
   * Sort results
   */
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  /**
   * Pagination
   */
  pagination(resPerPage = 10) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;
