import express,{Express} from "express"
import { PORT } from "./secrets";
import { PrismaClient } from "@prisma/client";
import RootRouter from "./routes";

const app:Express = express();

app.use(express.json())
app.use("/api_V1",RootRouter)
export const prismaClient = new PrismaClient({
    log: ["query"]
})
app.get('/',(req,res) => {
    res.json("this api is accessible meet the dev" + `${req.originalUrl}${req.method}`);
})
app.listen(PORT,() => {
    console.log("server is live");
})