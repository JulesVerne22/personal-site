import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { clientPromise } from '../../../lib/mongodb'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.DOMAIN + "/api/login", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user: any = await res.json()
  
        if (res.ok && user) {
          return {
            id: user.data.id,
            name: user.data.name,
            email: user.data.email,
            image: user.data.image
          }
        }
        throw new Error(JSON.stringify({ status: false, error: user.error }))
      }
    })
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt"
  },
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect() {
      return process.env.DOMAIN || '/'
    }
  }
})