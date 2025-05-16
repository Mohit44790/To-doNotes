import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.js';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();
const app = express();
ConnectDB();

// ✅ CORS Configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Make sure this URL is set correctly in Vercel environment variables
    credentials: true, // Enable if you're using cookies or auth headers
}));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// Export the Express app as a Vercel serverless function
export default function handler(req, res) {
  app(req, res); // Pass the request and response objects to the Express app
}
