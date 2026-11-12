
import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined. Check the root .env file.');
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const connection = await mongoose.connect(mongoURI, {
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
      });

      console.log(
        `MongoDB connected successfully: ${connection.connection.host}`
      );

      return connection;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt}/3 failed:`,
        error.message
      );

      if (attempt === 3) {
        throw error;
      }

      console.log('Retrying MongoDB connection in 5 seconds...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

export default connectDB;
