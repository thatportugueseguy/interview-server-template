import { Router } from 'express';
const router = Router();

router.get('/', function (_req, res) {
  return res.send('hello');
});

export default router;
