import { Controller } from '@/presentation/interfaces/controller'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces/http'
import { SignIn } from '@/domain/usecases/user/'
import { badRequest, unauthorized, success, serverError } from '@/presentation/helpers/http'
import { MissingParamError } from '@/presentation/errors/'

export class LoginController implements Controller {
  constructor (
    private readonly loginService: SignIn
  ) {}
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
