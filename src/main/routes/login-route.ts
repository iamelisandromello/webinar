import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { LoginController} from '@/presentation/controllers/login-controller'
//import { UserRepository } from '@/infrastructure/database/mongo/user-mongo-repository'
import { UserRepository } from '@/infrastructure/database/postgres/user-postgres-repository'
import { SignInService } from '@/application/sign-in-service'
import { Router } from 'express'

const makeLoginController = (() => {
  const userRepository = new UserRepository()
  const siginService = new SignInService(userRepository)
  return new LoginController(siginService)
})

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
