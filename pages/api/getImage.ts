import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import clientPromise from '../../lib/mongodb'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const token = await getToken({ req, secret })
      if (token) {
        try {
          await clientPromise()
          const user = await User.findOne({ email: token.email })
          res.status(200).json({ status: 'ok', data: user.image })
        } catch (err: any) {
          res.status(400).json({ status: 'error', error: 'Failed to get image' })
        }
      } else {
        res.status(200).json({ status: 'error', error: 'Failed to get image' })
      }
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
