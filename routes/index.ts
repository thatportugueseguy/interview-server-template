import { Router } from 'express';
const router = Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('All good');
});

export default router;
