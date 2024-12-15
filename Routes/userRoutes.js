import { Router } from "express";
import { postCreateUser, postLogin } from "../Controllers/userController.js";

const router = Router();

router.post('/signup', postCreateUser);
router.post('/login', postLogin);


export default router;