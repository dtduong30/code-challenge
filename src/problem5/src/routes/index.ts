import { Router } from "express"
import bookmarkRoutes from './bookmarkRoutes';

const router = Router();
router.use('/bookmarks', bookmarkRoutes);

export default router;