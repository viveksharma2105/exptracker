import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Rent", amount: 1000 },
  { id: 3, title: "Utilities", amount: 150 },
];

const createPostSchema = z.object({
    title: z.string().min(3).max(15),
    amount: z.number().min(2).int().positive()
});

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })


  .post("/",zValidator("json",createPostSchema), async (c) => {
    //const data: Expense = await c.req.json();
    const data = await c.req.valid("json");
    const expense = createPostSchema.parse(data)
    fakeExpenses.push({...expense,id: fakeExpenses.length})

    return c.json(expense);
  });

  .get('/:id{[0-9]+}',(c) =>{
    const id = Number.parseInt(c.req.param("id"))
  })
