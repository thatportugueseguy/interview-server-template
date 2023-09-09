import { Router } from 'express';
const router = Router();

router.get('/', function (_req, res) {
  return res.send('All good');
});

router.post('/', function (req, res) {
  console.log(req.body, req.get('user-agent'));
  return res.sendStatus(201);
});

export default router;
