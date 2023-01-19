import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db('personal-site')
  switch (req.method) {
    case 'POST':
      res.send('ERROR: Not available')
      break
    case 'GET':
      const allGames = await db.collection('games').find({}).toArray()
      res.json({ status: 200, data: allGames })
      break
  }
}
