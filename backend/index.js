import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
import connectDB from './config/db.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { app,server } from './socket/socket.js'
import path from 'path'

dotenv.config()
connectDB()

const PORT = process.env.PORT
const __dirname = path.resolve();

const corsOptions = {
    origin: 'https://chat-app-og0l.onrender.com/', // Replace with your client-side URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browsers
  };
app.use(cors(corsOptions))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/build")))

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"frontend","build","index.html"))
})

server.listen(PORT,() => {console.log(`Listening at port ${PORT}`)})