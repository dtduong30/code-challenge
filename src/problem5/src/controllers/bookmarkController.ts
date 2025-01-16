import type { Request, RequestHandler, Response } from "express";
import bookmarkService from '../services/bookmarkService';
import { StatusCodes } from '../shared/constants/statusCode';


export const createBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await bookmarkService.createBookmark(req.body);
    res.status(StatusCodes.CREATED).send({ message: 'Bookmark created successfully', data: bookmark });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Bookmark creation failed', error: JSON.stringify(error) });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const result = await bookmarkService.getBookmarks(req.query);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await bookmarkService.getBookmark(req.params.id);
    if (!bookmark) {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Bookmark not found' });
    }
    res.status(StatusCodes.OK).send(bookmark);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: (error as any)?.message });
  }
};

export const updateBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await bookmarkService.updateBookmark(req.params.id, req.body);
    if (!bookmark) {
      res.status(404).send({ message: 'Bookmark was not found' });
    }
    res.status(StatusCodes.OK).send({ message: 'Bookmark updated successfully', data: bookmark });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: 'Bookmark update failed', error: JSON.stringify(error) });
  }
};

export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const bookmark = await bookmarkService.deleteBookmark(req.params.id);
    if (!bookmark) {
      res.status(StatusCodes.NOT_FOUND).send({ message: 'Bookmark not found' });
    }
    res.status(StatusCodes.OK).send({ message: 'Bookmark deleted successfully'});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};