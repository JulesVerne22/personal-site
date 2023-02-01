import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  switch (req.method) {
    case 'GET':
      const userID = req.query.userID as string
      await clientPromise()
      
      try {
        await User.updateOne({ id: userID }, { verified: true }, { runValidators: true })
      } catch (err: any) {
        return res.status(400).json({ status: 'error', error: 'Failed to verify email' })
      }
      res.redirect(process.env.DOMAIN + '/auth/signin')
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
