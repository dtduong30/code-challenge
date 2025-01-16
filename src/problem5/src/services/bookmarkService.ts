import Bookmark from '../models/bookmarkModel';
import { IBookmark } from '../types';
import MultipleBaseService from './multipleBaseService';

class BookmarkService extends MultipleBaseService {
  async createBookmark(data: IBookmark) {
    const bookmark = new Bookmark(data);
    return await bookmark.save();
  }

  async getBookmarks(query: any) {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', search = '' } = query;
    const skip = this.getOffset(+page, +limit);
    const searchQuery = search
      ? {
        $or: [
          { url: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
        ],
      }
      : {};
    const data = await Bookmark.find({...searchQuery})
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(+limit)
      .select({ __v: 0 })
      .lean();

    const total = await Bookmark.countDocuments({ ...searchQuery });
    return { data, total, page: +page, limit: +limit };
  }

  async getBookmark(id: string) {
    return await Bookmark.findById(id, { __v: 0 }).lean();
  }

  async updateBookmark(id: string, data: Partial<IBookmark>) {
    return await Bookmark.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteBookmark(id: string) {
    return await Bookmark.findByIdAndDelete(id);
  }
}

export default new BookmarkService();
