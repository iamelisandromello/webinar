import { Request } from "express";
import { userInfo } from "os";

export class LoginController {
  handle (request: Request) {
    const { user, password} = request.body
    if (!user) return { statusCode: 404, badRequest: 'Required user field!'}
    if (!password) return { statusCode: 404, badRequest: 'Required password field!'}

    

    const response = user
    return response
  }  
}
