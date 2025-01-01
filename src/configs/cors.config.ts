import { CorsOptions } from "cors";


export const corsOption: CorsOptions ={
    origin: (origin,cb) => {
        const allowOrigin = ["http://localhost:3000"]
        if(!origin || allowOrigin.indexOf(origin) !== -1) {
            cb(new Error("NOT ALLOWED BY CORS"))
        }else {
            cb(null,true)
        }
    },
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept-Version'
    ],
    // exposedHeaders: [],
    credentials: true, // for usage of cookies
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204
}