import mongoose from 'mongoose'

declare global {
  var mongoose: any
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'

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
