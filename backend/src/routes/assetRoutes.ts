import express from 'express';
import { protect, clientOnly } from '../middleware/auth.js';
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset
} from '../controllers/assetController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAssets)
  .post(clientOnly, createAsset);

router.route('/:id')
  .get(getAssetById)
  .put(clientOnly, updateAsset)
  .delete(clientOnly, deleteAsset);

export default router;