import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import ResumeRouter from "./routes/ResumeRoutes.js";
import AIRouter from "./routes/AIRoutes.js";

const app = express();
const port = process.env.port || 3000;

// Database connection 
await connectDb()

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>res.send("Server is Live"));
app.use('/api/users', userRouter);
app.use('/api/resumes', ResumeRouter);
app.use('/api/ai', AIRouter)
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})