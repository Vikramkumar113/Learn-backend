import { Router } from 'express'
import { getAllArticles, createArcticle, getArticleById, updateArticle, deleteArticle } from '../Controllers/getArticles.js';

const router = Router();

router.get('/articles', getAllArticles);
router.post('/create-article', createArcticle);
router.get('/articles/:id', getArticleById);
router.patch('/update-article/:id', updateArticle);
router.delete('/delete/:id', deleteArticle)

export default router;
