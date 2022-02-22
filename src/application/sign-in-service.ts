import { SignIn } from '@/domain/usecases/user'
import { CheckLoginRepositoryContract } from '@/application/contracts/check-login-repository'

export class SignInService implements SignIn {
  constructor(
    private readonly loginUser: CheckLoginRepositoryContract
  ) {}

  async sigin (params: SignIn.Params): Promise<SignIn.Result> {
    const verify = await this.loginUser.verify(params)
    return verify
  }
}
