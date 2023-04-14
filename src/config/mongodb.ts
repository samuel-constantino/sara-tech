import { MongoClient } from 'mongodb'

// let uri = process.env.MONGODB_URI || "" // trick ts :(
// let dbName = process.env.MONGODB_DB
let uri = "mongodb+srv://sara-tech:XgpLwS5av3zSTr6f@sara.bei34zm.mongodb.net/?retryWrites=true&w=majority"
let dbName = "client1"

let cachedClient: any = null
let cachedDb: any = null

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  )
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = await MongoClient.connect(uri)

  const db = await client.db(dbName)

  cachedClient = client
  cachedDb = db

  return { client, db }
}