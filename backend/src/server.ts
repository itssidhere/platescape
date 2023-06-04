import express, { Application } from 'express';
import userRoutes from '../routes/userRoutes';
import authMiddleware from '../middlewares/authMiddleware';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

//connect routes to the app
app.use('/', userRoutes);


//start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));