import { Router } from 'express';
import {
  updateProfile,
  getUserVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  updateDriverPreferences
} from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.put('/profile', authMiddleware, updateProfile);
router.get('/vehicles', authMiddleware, getUserVehicles);
router.post('/vehicles', authMiddleware, addVehicle);
router.put('/vehicles/:id', authMiddleware, updateVehicle);
router.delete('/vehicles/:id', authMiddleware, deleteVehicle);
router.put('/preferences', authMiddleware, updateDriverPreferences);

export default router;