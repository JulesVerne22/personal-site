import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, default: '/images/CartoonRobot.png' }
  },
  { collection: 'credentialUsers' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
