import dotenv from 'dotenv';
import { ConnectDB } from './utils/db.js';
dotenv.config();
import app from "./app.js"

function StartServer(){
  const port= process.env.PORT

  ConnectDB()
  .then(()=>{
    app.on("error", (err)=>{
      throw err;
    })

    app.listen(port, '0.0.0.0',()=>{
      console.log(`Connected to server ${port}`)
    })
  })
  .catch((err)=>{
    console.log("Error: ", err);
    process.exit(1);
  })
}


StartServer();