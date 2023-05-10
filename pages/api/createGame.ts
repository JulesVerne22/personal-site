import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import Game from '../../models/Game'
import clientPromise from '../../lib/mongodb'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  switch (req.method) {
    case 'POST':
      const { name, description, image } = req.body
      const token = await getToken({ req, secret })

      if (!name || typeof name !== 'string') {
        return res.status(400).json({ status: 'error', error: 'Invalid game name' })
      }
      
      if (!description || typeof description !== 'string') {
        return res.status(400).json({ status: 'error', error: 'Invalid game description' })
      }
      
      if (!image || typeof image !== 'string') {
        return res.status(400).json({ status: 'error', error: 'Invalid game image' })
      }

      if (token) {
        try {
          await clientPromise()
          const user = await User.findOne({ email: token.email })

          if (user.admin) {
            await Game.create({
              name,
              description,
              image
            })
          } else {
            return res
              .status(400)
              .json({
                status: 'error',
                error: 'Admin access required'
              })
          }
        } catch (err: any) {
          return res
            .status(400)
            .json({
              status: 'error',
              error: 'Failed to create game'
            })
        }
  
        res.status(200).json({ status: 'ok', data: 'Successfully created game' })
      } else {
        res.status(400).json({ status: 'error', error: 'Failed to get token' })
      }
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}