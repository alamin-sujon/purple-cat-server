import express from 'express';
import cors from 'cors';
import { route } from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://purple-cat-client-nsyv.vercel.app',
    ],
  }),
);

app.use('/api', route);
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Hello World from Blog',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
