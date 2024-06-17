import mongoose from "mongoose";

const connectionMongoDB=async()=>{
    try {
      const connect=  await mongoose.connect(process.env.MONGO_URI);
            console.log(`connected to db: ${connect.connection.host}`);

        
    } catch (error) {
        console.error(`Error connecting to db:${error.message} `)
        throw error;
        
    }
}

export default connectionMongoDB;