import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';  
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'process.env.FRONTEND_URL', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(morgan('dev'));

// app.use(cors());
app.use(express.json());

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Suceessfully");
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Welcome to TaskHub API"
  })
})

// http://localhost:5000/api-v1
app.use('/api-v1', routes);

//error middleware
app.use((err, req, res, next) =>{
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error"}) 
})

//not found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});