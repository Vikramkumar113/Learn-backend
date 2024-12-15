import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../Controllers/todoController.js";
import { authenticatedUser } from "../Middleware/isAuthorize.js";

const router = Router();

router.post('/create-todo', authenticatedUser,  createTodo);
router.get('/todos', authenticatedUser,   getTodos);
router.patch('/update/:id', authenticatedUser,  updateTodo);
router.delete('/delete/:id', authenticatedUser, deleteTodo);

export default router;