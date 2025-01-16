import { DEFAULT_MAX_PAGE_SIZE, DEFAULT_PAGE } from '../shared/constants';

export default class MultipleBaseService {
  getOffset(page: number, size = DEFAULT_MAX_PAGE_SIZE): number {
    return page > 1
      ? size > DEFAULT_MAX_PAGE_SIZE
        ? (page - 1) * DEFAULT_MAX_PAGE_SIZE
        : (page - 1) * size
      : 0;
  }

  getPage(page: number): number {
    return !page || isNaN(page) || page < 0 ? DEFAULT_PAGE : +page
  }
}
