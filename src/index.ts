import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();

import songs from './routes/song';
import errorHandler from './middlewares/errorHandler';
import rateLimit from 'express-rate-limit';

// MIDDLEWARES
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler)

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute 
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

app.use(limiter)

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error('FATAL ERROR: jwtPrivateKey is not set.');
    process.exit(1);
}

mongoose.connect(DATABASE_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB ', err));

app.get('/test', (req: Request, res: Response) => {
    res.send('Hello!')
})

// ROUTES
app.use('/api/v1/songs', songs);


app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});