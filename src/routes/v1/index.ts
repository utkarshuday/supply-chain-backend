import { Router } from 'express';

import consumerRouter from './consumer';
import sellerRouter from './seller';

const router = Router();

router.use('/consumers', consumerRouter);
router.use('/sellers', sellerRouter);

export default router;
