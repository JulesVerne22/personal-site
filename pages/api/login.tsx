import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  switch (req.method) {
    case 'POST':
      const { email, password } = req.body
      const user = await User.findOne({ email: email }).lean()

      if (!user) {
        return res.status(400).json({ status: 'error', error: 'Invalid username/password' })
      }

      if (await bcrypt.compare(password, user.password)) {

        return res.status(200).json({ status: 'ok', data: { 
          name: user.name,
          email: user.email,
          image: user.image,
          id: user.id
         }})
      }

      res.status(400).json({ status: 'error', error: 'Invalid username/password' })
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
