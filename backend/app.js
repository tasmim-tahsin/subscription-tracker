import express from 'express';
import cookieParser from 'cookie-parser';

import errorMiddleware from './middlewares/error.middleware.js';
import { PORT } from './config/env.js';
//const PORT=5500;

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import workflowRouter from './routes/workflow.routes.js';

import connectToDatabase from './database/mongodb.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

app.use(errorMiddleware);

app.get('/', (req, res)=>{
    res.send("Welcome to subscription Tracker API");
} );

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
  
    await connectToDatabase();
  });

export default app;


