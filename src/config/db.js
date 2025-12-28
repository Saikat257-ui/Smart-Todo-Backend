import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

/**
 * Connect to MongoDB database
 * Handles connection errors and logs connection status
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
