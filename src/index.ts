import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { PingRouter } from './router/PingRouter';
import { PizzaRouter } from './router/PizzaRouter';

dotenv.config()
const app: Express = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
    console.log(`Server is running in http://localhost:${process.env.PORT || 3003}`)
})

app.use("/api/ping", PingRouter)
app.use("/api/pizzas", PizzaRouter)