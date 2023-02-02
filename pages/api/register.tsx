import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import clientPromise from '../../lib/mongodb'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await clientPromise()

  switch (req.method) {
    case 'POST':
      const { plainTextPassword, email, name } = req.body
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ status: 'error', error: 'Invalid email' })
      }

      const validRegex = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')

      if (validRegex.test(email)) {
        return res.status(400).json({ status: 'error', error: 'Invalid email' })
      }

      if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.status(400).json({ status: 'error', error: 'Invalid password' })
      }

      if (plainTextPassword.length < 6) {
        return res.status(400).json({ status: 'error', error: 'Password must be at least 6 characters long' })
      }

      const password = await bcrypt.hash(plainTextPassword, 10)
      let user
      try {
        user = await User.create({
          password,
          name,
          email
        })
      } catch (err: any) {
        if (err.code === 11000) {
          return res.status(400).json({ status: 'error', error: 'Username/Email already in use' })
        }
        throw err
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD
        }
      })

      const mailConfiguration = {
        from: process.env.GMAIL_USERNAME,
        to: user.email,
        subject: 'Email Verification',
        text: `Hey!\n\nThanks for joining my site!\n\nPlease follow this link to verify your email address:\n\n${process.env.DOMAIN}/api/verify/${user.id}\n\nThanks,\n\nJulian`
      }

      transporter.sendMail(mailConfiguration, (error: any, info: any) => {
        if (error) {
          throw Error(error)
        }
        return res.status(200).json({ status: 'ok', data: { message: 'Email sent successfully', info: info } })
      })

      res.status(200).json({ status: 'ok' })
      break
    default:
      res.status(400).json({ status: 'error', error: 'Invalid request' })
      break
  }
}
