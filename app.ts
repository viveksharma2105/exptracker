import {Hono} from 'hono';
import { logger } from 'hono/logger';
import { expensesRoute } from './routes/expenses';

const app = new Hono();

app.use('*', logger());
app.route('/api/expenses', expensesRoute);

app.get('/test', c =>{
    return c.json({message: "Hello from test route!"})
})
export default app;