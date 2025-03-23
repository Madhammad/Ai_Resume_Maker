
import { summaryGenertorController } from '../controllers/ai.controller/interview.controller.js';
import { jwtVerify } from './../middlewares/auth.middleware.js';
import  express  from 'express';

const router = express.Router();

router.post("/generSummary",  summaryGenertorController);


export default router;