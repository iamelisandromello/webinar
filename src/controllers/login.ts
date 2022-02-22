import { Request } from "express"
import { User } from '@/Models/user'

export class LoginController {
  async handle (request: Request) {
    const { user, password} = request.body
    if (!user) return { statusCode: 404, badRequest: 'Required user field!'}
    if (!password) return { statusCode: 404, badRequest: 'Required password field!'}

    const person = new User()
    const login = await person.search(request.body)
    console.log('Controller Person:', login);

    const loginPostgres = await person.searchPostgres(request.body)
    console.log('POSTGRESS: ', loginPostgres);

    if (!login) return { statusCode: 401, UnauthorizedRequest: 'Login attempt failed!'}
    if (login) return { statusCode: 200, SUccessdRequest: 'Login success!'}
  }  
}
