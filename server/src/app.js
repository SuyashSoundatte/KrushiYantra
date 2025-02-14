import express from "express";
const app = express();
import ErrorHandler from "./utils/errorHandler.js";
import cors from "cors";

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["POST", "GET", "PUT"]
}));

import googleLogin from "./routes/auth.routes.js";

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});


app.use('/api/auth', googleLogin);
app.use(ErrorHandler)

app.get('/', (req, res)=>{
  res.send("hello");
})

export default app;