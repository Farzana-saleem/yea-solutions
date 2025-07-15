import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { taskRoutes } from './routes/task.routes';
import { connectDB, sequelize } from './config/db';
import './models/user.model';
import './models/task.model';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

connectDB();
sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});