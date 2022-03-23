import { Controller } from '@/presentation/interfaces/controller'
import { HttpRequest, HttpResponse } from '@/presentation/interfaces/http'
import { SignIn } from '@/domain/usecases/user/'
import { 
  UnauthorizedError,
  MissingParamError
} from '@/presentation/errors'
import { badRequest, success, serverError } from '@/presentation/helpers'


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
  
      if (!login) return badRequest(new UnauthorizedError())
  
      return success({message: 'Login success!'})
    } catch (error: any) {
      return serverError(error)
    }

  }  
}
