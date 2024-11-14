import cors from 'cors';
import express from "express";
import connectdb from "./ConnectionDB/connectionDB.js";
import certificateRoute from './Routes/certificateRoute.js';
import adminRoute from './Routes/adminRoute.js';
import InternRoute from './Routes/intern.js';
import SupportTicket from './Routes/createTicket.js'

const port = 8080;
const app = express();

app.use(cors({
    origin: [
        "https://docqinternportal.live",
        "https://www.docqinternportal.live",
        "intern-portal-six.vercel.app",
        "http://localhost:5173" // Keep this for local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }));

app.use(express.json());
connectdb('test');

app.use('/api/v1', certificateRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', InternRoute);
app.use('/api/v1', SupportTicket);

app.listen(port,()=>{
    console.log(`Connected to port ${port}`)
})
