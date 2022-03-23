import { LoginController} from '@/presentation/controllers/login-controller'
//import { UserRepository } from '@/infrastructure/database/mongo/user-mongo-repository'
import { UserRepository } from '@/infrastructure/database/postgres/user-postgres-repository'
import { SignInService } from '@/application/sign-in-service'

export const makeLoginController = (() => {
  const userRepository = new UserRepository()
  const siginService = new SignInService(userRepository)
  return new LoginController(siginService)
})
