import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import Bookmark from '../../models/bookmarkModel';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/hehe');
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.collection("bookmarks").deleteMany({});
  }
  await mongoose.connection.close();
});

describe('Bookmark Controller', () => {
  it('should create a new bookmark', async () => {
    const response = await request(app)
      .post('/api/bookmarks')
      .send({
        url: 'https://dev.to/kaja_uvais_a8691e947dd399/100-frontend-projects-to-level-up-your-skills-gkc?ref=dailydev',
        title: 'Tips FE',
        tags: ['dev', 'fe']
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data._id');
    expect(response.body.data.url).toBe('https://dev.to/kaja_uvais_a8691e947dd399/100-frontend-projects-to-level-up-your-skills-gkc?ref=dailydev');
  });

  it('should get all bookmarks', async () => {
    const response = await request(app).get('/api/bookmarks');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get all bookmarks with pagination and total', async () => {
    // Add multiple bookmarks for testing pagination and filtering
    await Bookmark.insertMany([
      { url: 'https://example1.com', title: 'Example 1', tags: ['example', 'bookmark'] },
      { url: 'https://example2.com', title: 'Example 2', tags: ['example', 'bookmark'] },
      { url: 'https://example3.com', title: 'Example 3', tags: ['example', 'bookmark'] },
    ]);

    const response = await request(app).get('/api/bookmarks?page=1&limit=2');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(2);
    expect(response.body.total).toBe(4);
    expect(response.body.page).toBe(1);
    expect(response.body.limit).toBe(2);
  });

  it('should filter bookmarks by search term', async () => {
    const response = await request(app).get('/api/bookmarks?search=Example 2');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].title).toBe('Example 2');
  });

  it('should get a bookmark by id', async () => {
    const bookmark = new Bookmark({
      url: 'https://example.com',
      title: 'Example',
      tags: ['example', 'bookmark']
    });
    await bookmark.save();

    const response = await request(app).get(`/api/bookmarks/${bookmark._id}`);
    expect(response.status).toBe(200);
    expect(response.body.url).toBe('https://example.com');
  });

  it('should update a bookmark by id', async () => {
    const bookmark = new Bookmark({
      url: 'https://example-update.com',
      title: 'Example-Update',
      tags: ['example', 'bookmark']
    });
    await bookmark.save();

    const response = await request(app)
      .put(`/api/bookmarks/${bookmark._id}`)
      .send({ title: 'Updated Example' });
    
    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe('Updated Example');
  });

  it('should delete a bookmark by id', async () => {
    const bookmark = new Bookmark({
      url: 'https://example.com',
      title: 'Example',
      tags: ['example', 'bookmark']
    });
    await bookmark.save();

    const response = await request(app).delete(`/api/bookmarks/${bookmark._id}`);
    expect(response.status).toBe(200);

    const deletedBookmark = await Bookmark.findById(bookmark._id);
    expect(deletedBookmark).toBeNull();
  });
});