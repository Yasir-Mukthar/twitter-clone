import { Router } from "express";
import { signup, login, logout,getCurrentUser } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";


const router=Router();


router.get("/getCurrentUser",protectedRoute,getCurrentUser)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


export default router;