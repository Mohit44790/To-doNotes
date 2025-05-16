import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

const app = express();
dotenv.config();
ConnectDB();

// ✅ CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Make sure this URL is set correctly in Vercel environment variables
    credentials: true, // Enable if you're using cookies or auth headers
}));

app.use(express.json()); // Only use once
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// Start the server (for local)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
