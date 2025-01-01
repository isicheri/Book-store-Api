import { ErrorCode, HttpException } from "./roots";


export class BadRequestException extends HttpException{
    constructor(message:string,statusCode:number,errorCode:ErrorCode,errors: any,success: boolean) {
        super(message,400,ErrorCode.BAD_REQUEST,errors,success)
    }
}