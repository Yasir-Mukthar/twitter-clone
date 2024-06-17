import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectionMongoDB from "./db/index.js";

dotenv.config();
const app=express()

app.use(express.json())
app.use("/api/auth",authRoutes)




connectionMongoDB()
.then(
  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port ${process.env.PORT || 8000}`)
  })
)