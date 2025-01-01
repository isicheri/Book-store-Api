import { ErrorCode, HttpException } from "./roots";


export class InternalError extends HttpException{
    constructor(message:string,errorCode:ErrorCode,errors: any) {
        super(message,500,errorCode,errors,false)
    }
}