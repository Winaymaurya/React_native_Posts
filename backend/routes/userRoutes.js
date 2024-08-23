import express  from "express";
import { getAllUsersController, loginUserController, registerUserController, updateUserController } from "../controllers/userControllers.js";

const router=express.Router();
 
// All Routes
router.get('/all-users',getAllUsersController)

// create user
router.post('/register',registerUserController)
router.post('/login',loginUserController)

// Update-User
router.put('/update-user',updateUserController)




export default router;
