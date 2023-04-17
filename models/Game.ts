import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
  },
  { collection: 'games' }
)

export default mongoose.models.Game || mongoose.model('Game', GameSchema)
