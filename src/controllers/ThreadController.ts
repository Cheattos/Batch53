import { Request, Response } from "express"
import ThreadService from "../services/ThreadService"

export  default new class AuthController {
    findAll(req: Request, res: Response ) {
        ThreadService.findAll(req,res)
    }
}