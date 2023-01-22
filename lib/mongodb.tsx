import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

declare global {
  var mongoose: any
  var _mongoClientPromise: Promise<MongoClient>
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const options = {}

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function dbConnect () {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {}
  
    cached.promise = mongoose.connect(uri, opts).then(mongoose => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export { clientPromise }