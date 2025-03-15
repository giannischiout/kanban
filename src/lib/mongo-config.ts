import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    process.exit(1) // Exit process on failure
  }
}

export default connectDB
