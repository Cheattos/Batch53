import { Request, Response } from "express"
import UserService from "../services/UserService"

export default new class UserController {
    findAll(req: Request, res: Response) {
        UserService.findAll(req, res)
    }
    findByID(req: Request, res: Response) {
        UserService.findByID(req, res)
    }
    delete(req: Request, res: Response) {
        UserService.delete(req, res)
    }
}