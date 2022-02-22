import { MongoHelper } from './mongo-helper'
import { PostgresHelper } from '@/Models/postgress-helper'

export class User {
  
  async search(params: any): Promise<any> {
    const userCollection = await MongoHelper.getCollection('users', 'webinar')
    const { user, password } = params
    
    const collection = await userCollection.findOne({ user,  password})
    //console.log('Collection: ', collection);
    return collection && true || false
  }

  async searchPostgres(params: any): Promise<any> {
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
