import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import assetRoutes from './routes/assetRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/clients', clientRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});