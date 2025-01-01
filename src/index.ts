import express,{Express} from "express"
import cors from "cors"
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import RootRouter from "./routes";
import { corsOption } from "./configs/cors.config";
import { requestLogger } from "./custom/customs";
import {errorMiddleWare} from "./middleware/error";

const app:Express = express();

app.use(requestLogger)
app.use(express.json())
// app.use(cors(corsOption))
//  //  we are going to leave it commented for now
//1.enable cors  res.set('Access-Control-Allow-Origin', 'http://localhost:3001');
app.use("/api_V1",RootRouter)
export const prismaClient = new PrismaClient({
    log: ["query"]
})
app.get('/',(req,res) => {
    res.json("this api is accessible meet the dev" + `${req.originalUrl}${req.method}`);
})
app.use(errorMiddleWare)
app.listen(PORT,() => {
    console.log("server is live");
})