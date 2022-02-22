import {CheckLoginRepositoryContract } from '@/application/contracts/check-login-repository'
import { PostgresHelper} from './postgres-helper'

export class UserRepository implements CheckLoginRepositoryContract {
  async verify (params: CheckLoginRepositoryContract.Params): Promise<CheckLoginRepositoryContract.Result> {
    const { user, password } = params

    const client = await PostgresHelper();
    const query = {
      user: 'fetch-user',
      text: 'SELECT * FROM webinar.users u WHERE u.user = $1 AND u.password = $2',
      values: [user, password],
    }

    const res = await client.query(query)
    //console.log('res: ', res.rows[0]);
    return res.rows[0] && true || false
  }
}
