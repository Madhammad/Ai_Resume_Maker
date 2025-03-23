import { Router } from "express";
import { createCVcontroller, cvcontroller, deleteCVcontroller, getAllcvController, getUserCVs } from "../controllers/ai.controller/cv.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";
import { upload } from './../middlewares/multer.middleware.js';


const router = Router();


router.post("/createCV", jwtVerify, upload.single("cvprofileImage"), createCVcontroller);

router.get("/cv/:cvId", jwtVerify, cvcontroller);
router.get("/getAllcv", getAllcvController);


//user projects
router.get("/userallCV/:user", jwtVerify, getUserCVs);

router.delete("/deleteCV/:CVId", jwtVerify, deleteCVcontroller);


export default router;