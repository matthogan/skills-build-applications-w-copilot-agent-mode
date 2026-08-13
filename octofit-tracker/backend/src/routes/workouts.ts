import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ route: '/api/workouts/', items: [] });
});

export default router;
