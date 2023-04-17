import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcryptjs'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const token = await getToken({ req, secret })
      const { plainTextPassword } = req.body
      
      if (token) {
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
          return res.status(400).json({ status: 'error', error: 'Invalid password' })
        }
        
        if (plainTextPassword.length < 6) {
          return res
            .status(400)
            .json({
              status: 'error',
              error: 'Password must be at least 6 characters long'
            })
        }
        
        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
          await clientPromise()
          await User.updateOne({
            email: token.email },
            { password: password },
            { runValidators: true
          })
        } catch (err: any) {
          return res
            .status(400)
            .json({
              status: 'error',
              error: 'Failed to update password'
            })
        }
  
        res.status(200).json({ status: 'ok' })
      } else {
        res.status(400).json({ status: 'error', error: 'Failed to update password' })
      }
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
