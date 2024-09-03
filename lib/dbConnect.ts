import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_UR
if (!MONGODB_URI) throw new Error("MONGODB_URI env is not defined")

const dbConnect = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return
    const { connection } = await mongoose.connect(MONGODB_URI as string, {
      dbName: 'nextAuth',
    })
    console.log(`Connected to database: ${connection.host}`)

  } catch (e) {
    throw new Error("Error connecting to database")
  }
}

export default dbConnect
