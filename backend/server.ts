import express, { Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
const { PORT, NODE_ENV } = process.env

const port = PORT || 7777;
const app = express();

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use((req: Request, res: Response, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get('/', async (req: Request, res: Response) => {
  res.send('API is running...');
});

app.listen(
  port,
  () => console.log(colors.yellow(`Server running in ${NODE_ENV} mode on port ${port}.`))
);
