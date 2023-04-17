import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import clientPromise from '../../lib/mongodb'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const token = await getToken({ req, secret })
      const { image } = req.body
      
      if (token) {
        if (!image || typeof image !== 'string') {
          return res.status(400).json({ status: 'error', error: 'Invalid image path' })
        }

        try {
          await clientPromise()
          await User.updateOne({ email: token.email }, { image: image }, { runValidators: true })
        } catch (err: any) {
          return res.status(400).json({ status: 'error', error: 'Failed to update image' })
        }
  
        res.status(200).json({ status: 'ok' })
      } else {
        res.status(400).json({ status: 'error', error: 'Failed to update image' })
      }
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
