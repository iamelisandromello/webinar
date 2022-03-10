import { MongoClient, Collection } from 'mongodb'
import { PropertiesGlobal } from '@/main/config/global'
import { variables } from '@/main/config/variables'

declare const global: PropertiesGlobal
export const MongoHelper = {

  async connect (uri: string, nameDatabase: string): Promise<void> {
    global.uri = uri

    await MongoClient.connect(global.uri)
      .then((conn: MongoClient) => {
        global.db = conn.db(nameDatabase)
        global.conn = conn
      })
  },

  async disconnect (): Promise<void> {
    await global.conn.close()
    global.conn = null
  },

  async getCollection (name: string, nameDatabase: string): Promise<Collection> {
    global.uri = variables.mongoUrl
    if (!global.conn) {
      await this.connect(global.uri, nameDatabase)
    }
    return global.db.collection(name)
  },
}
