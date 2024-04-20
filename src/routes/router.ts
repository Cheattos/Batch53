import * as express from "express"
import * as path from "path"
import AuthController from "../controllers/AuthController"
import AuthMiddelware from "../middlewares/AuthMiddelware"
import upload from "../middlewares/UploadMiddleware"
import UserController from "../controllers/UserController"
import ThreadController from "../controllers/ThreadController"


const router = express.Router()

// Auth
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)

router.get('/findAll', UserController.findAll)
router.get('/findByID/:userId', UserController.findByID)
router.delete('/delete/:userId', AuthMiddelware.Auth, UserController.delete)


// Thread
router.get('/findThread/:page', AuthMiddelware.Auth, ThreadController.findAll)

router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

export default router