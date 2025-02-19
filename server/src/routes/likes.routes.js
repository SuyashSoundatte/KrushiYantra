import { Router } from 'express';

const router = Router();

router.post('/likes',verifyToken );
router.delete('/likes/:id',verifyToken );

export default router;