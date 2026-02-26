import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { id } from "zod/locales";

const expenseScheme = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(15),
  amount: z.number().min(2).int().positive()
});

type Expense = z.infer<typeof expenseScheme>
const createPostSchema = expenseScheme.omit({id: true})


const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Rent", amount: 1000 },
  { id: 3, title: "Utilities", amount: 150 },
];



export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses });
  })


  .post("/",zValidator("json",createPostSchema), async (c) => {
    //const data: Expense = await c.req.json();
    const data = await c.req.valid("json");
    const expense = createPostSchema.parse(data)
    fakeExpenses.push({...expense,id: fakeExpenses.length + 1})
    c.status(201);
    return c.json(expense);
  })

  .get('/:id{[0-9]+}',(c) =>{
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.find(e => e.id === id)
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
.delete('/:id{[0-9]+}',(c) =>{
  const id = Number.parseInt(c.req.param("id"))
  const index = fakeExpenses.findIndex(expense =>expense.id === id)
  if (index === -1) {
    return c.notFound();

  }
  const deletedExpense = fakeExpenses.splice(index,1)[0];
  return c.json({expense: deletedExpense})
})