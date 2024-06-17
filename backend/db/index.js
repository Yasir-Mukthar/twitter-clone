import mongoose from "mongoose";

const connectionMongoDB=async()=>{
    try {
      const connection=  await mongoose.connect(process.env.MONGO_URI);
            console.log(`connected to db: ${connection.host}`);

        
    } catch (error) {
        console.error(`Error connecting to db:${error.message} `)
        
    }
}

export default connectionMongoDB;