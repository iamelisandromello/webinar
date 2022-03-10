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

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

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
    try {
      const { user, password} = request.body

      if (!user) return badRequest(new MissingParamError('user'))
      if (!password) return badRequest(new MissingParamError('password'))
  
      const login = await this.loginService.sigin(request.body)
  
      console.log('Controller return service auth: ', login);
  
      if (!login) return unauthorized()
  
      return success({message: 'Login success!'}) 
    } catch (error: any) {
      return serverError(error)
    }
  }  
}
