import { Router } from 'express';
import user from './user';
import pivot from './pivot';

const router = Router();

router.use('/users', user);
router.use('/pivot', pivot);

export default router;
