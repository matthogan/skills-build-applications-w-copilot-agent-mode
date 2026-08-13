import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ route: '/api/users/', items: [] });
});

export default router;
