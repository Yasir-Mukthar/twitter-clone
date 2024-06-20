import { Router } from "express";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import {followUnfollowUser,getSuggestedUsers,updateUser} from "../controllers/user.controller.js"

const router =Router()



// router.get("/profile/:username",protectedRoute,getUserProfile)
router.get("/suggested",protectedRoute,getSuggestedUsers)
router.post("/follow/:id",protectedRoute,followUnfollowUser)
router.post("/update",protectedRoute,updateUser)







export default router;