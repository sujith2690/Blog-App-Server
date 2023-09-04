import express from 'express'
import { getAllUsers } from '../controller/userController.js'
import { loginUser, signUpUser } from '../controller/authController.js'

const router = express.Router()

router.get("/",getAllUsers)
router.post('/signUp',signUpUser)
router.post("/login",loginUser)



export default router;