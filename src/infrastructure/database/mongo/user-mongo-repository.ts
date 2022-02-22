import {CheckLoginRepositoryContract } from '@/application/contracts/check-login-repository'
import { MongoHelper} from './mongo-helper'

export class UserRepository implements CheckLoginRepositoryContract {
  async verify (params: CheckLoginRepositoryContract.Params): Promise<CheckLoginRepositoryContract.Result> {
    const userCollection = await MongoHelper.getCollection('users', 'webinar')
    const { user, password } = params
    
    const collection = await userCollection.findOne({ user,  password})
    //console.log('Collection: ', collection);
    return collection && true || false
  }
}
