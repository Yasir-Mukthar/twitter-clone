import express from "express"
import dotenv from "dotenv"
import connectionMongoDB from "./db/index.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

//import routes
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.routes.js"



dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app=express()


app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:"5mb"}));
app.use(cookieParser())


//routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/notifications",notificationRoutes)



connectionMongoDB()
.then(
  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running at port ${process.env.PORT || 8000}`)
  })
)