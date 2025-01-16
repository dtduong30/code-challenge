import mongoose, { Document, Schema } from 'mongoose';
import { IBookmark } from '../types';

const BookmarkSchema: Schema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IBookmark>('Bookmark', BookmarkSchema);