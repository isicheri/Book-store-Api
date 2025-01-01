import { ErrorCode, HttpException } from "./roots";



export class NotFound extends HttpException{
    constructor(message:string,errorCode:ErrorCode,errors:any) {
        super(message,404,errorCode,errors,false)
    }
}