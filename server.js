import path from 'path'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

// import routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

// connect to db
connectDB()

const app = express();

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); // allows all origins
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true,
}));

// middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// Serving assets from client build for Heroku deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use('*', express.static('client/build'));
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
