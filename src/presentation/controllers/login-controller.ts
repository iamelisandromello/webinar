import { User } from '@/Models/user'
import { Controller } from '@/presentation/interfaces/controller'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces/http'
import { SignIn } from '@/domain/usecases/user/'

export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ServerError extends Error {
  constructor (error: Error) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = error?.stack ?? 'Undefinied Error'
  }
}

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error) 
})

export class LoginController implements Controller {
  constructor (
    private readonly loginService: SignIn
  ){}
  async handle (request: HttpRequest): Promise<HttpResponse> {
    const { user, password} = request.body
    if (!user) return { statusCode: 404, body: 'Required user field!'}
    if (!password) return { statusCode: 404, body: 'Required password field!'}
    //if (!user) return badRequest(new MissingParamError('user'))
    //if (!password) return badRequest(new MissingParamError('password'))

    const person = new User()
    const login = await person.search(request.body)
    console.log('Controller Mongo:', login);

    //const loginPostgres = await person.searchPostgres(request.body)
    const loginPostgres = await this.loginService.sigin(request.body)

    console.log('Controller POSTGRESS: ', loginPostgres);

    if (!login) return { statusCode: 401, body: {
      message: 'Login attempt failed!'
    }}
    //if (!login) return badRequest(new UnauthorizedError())
    return { statusCode: 200, body: {
      message: 'Login success!'
    }}
    //return success({message: 'Login success!'})
  }  
}
