import { Router } from 'express';
import verifyToken from '../middlewares/Verify.middleware.js'; 

const router = Router();

router.get('/comments/:blogId', );
router.post('/comments',verifyToken );
router.put('/comments/:id',verifyToken );
router.delete('/comments/:id',verifyToken );

export default router;