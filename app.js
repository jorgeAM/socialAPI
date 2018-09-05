import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user';
import followRoutes from './routes/follow';
import publicationRoutes from './routes/publication';
import messageRoutes from './routes/message';

const app = express();

app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', followRoutes);
app.use('/api', publicationRoutes);
app.use('/api', messageRoutes);

export default app;
