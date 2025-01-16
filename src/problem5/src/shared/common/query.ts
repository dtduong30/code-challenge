import { Model } from 'mongoose';

interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

export const queryWithPagination = (
  query: QueryOptions,
  searchFields: string[] = []
) => {
  const { page = 1, limit = 20, sort = 'createdAt', order = 'asc', search = '', ...filters } = query;

  const searchQuery = search
    ? {
        $or: searchFields.map(field => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      }
    : {};

  const filterQuery = Object.keys(filters).length ? filters : {};
  
};