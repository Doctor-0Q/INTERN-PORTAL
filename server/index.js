import cors from 'cors';
import express from "express";
import connectdb from "./ConnectionDB/connectionDB.js";
import certificateRoute from './Routes/certificateRoute.js';
import adminRoute from './Routes/adminRoute.js';
import InternRoute from './Routes/intern.js';
import SupportTicket from './Routes/createTicket.js'
import notificationRoute from './Routes/notificationRoute.js';

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const port = 8080;
const app = express();

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.options('*', cors())

app.use(express.json());
connectdb('test');

app.use('/api/v1', certificateRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', InternRoute);
app.use('/api/v1', SupportTicket);
app.use('/api/v1/sendNotification', notificationRoute);

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})

