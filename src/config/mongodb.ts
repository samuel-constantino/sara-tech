import { MongoClient } from 'mongodb'

let uri = "mongodb+srv://sara-tech:XgpLwS5av3zSTr6f@sara.bei34zm.mongodb.net/?retryWrites=true&w=majority"
let dbName = "client1"

let cachedClient: any = null
let cachedDb: any = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = await MongoClient.connect(uri)
  
    const db = await client.db(dbName)
  
    cachedClient = client
    cachedDb = db
  
    return { client, db }
  } catch(e: any) {
    return {error: true, message: e.message}
  }

}