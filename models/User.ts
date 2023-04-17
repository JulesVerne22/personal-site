import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: '/images/profilePictures/CartoonRobot.png' },
  verified: { type: Boolean, default: false },
  admin: { type: Boolean, default: false }
  },
  { collection: 'credentialUsers' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
