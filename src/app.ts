import express, { Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './module/products/product.route';
import { OrderRoutes } from './module/orders/orders.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
