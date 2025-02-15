import express from "express";
const app = express();
import ErrorHandler from "./utils/errorHandler.js";
import cors from "cors";

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

import googleLogin from "./routes/auth.routes.js";



app.use('/api/auth', googleLogin);
app.use(ErrorHandler)

app.get('/', (req, res)=>{
  res.send("hello");
})

export default app;