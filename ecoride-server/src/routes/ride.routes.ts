import { Router } from 'express';
import {
  searchRides,
  getRideDetails,
  createRide,
  joinRide,
  getUserRides,
  cancelRide
} from '../controllers/ride.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', searchRides);
router.get('/history', authMiddleware, getUserRides);
router.get('/:id', getRideDetails);
router.post('/', authMiddleware, createRide);
router.post('/:id/join', authMiddleware, joinRide);
router.delete('/:id/cancel', authMiddleware, cancelRide);

export default router;