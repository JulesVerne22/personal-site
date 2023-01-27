import type { NextApiRequest, NextApiResponse } from 'next'
import Game from '../../models/Game'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  switch (req.method) {
    case 'GET':
      try {
        const allGames = await Game.find({})
        res.status(200).json({ status: 'ok', data: allGames })
      } catch (err) {
        res.status(400).json({ status: 'error' })
      }
      break
    default:
      res.status(400).json({ status: 'error' })
      break
  }
}
