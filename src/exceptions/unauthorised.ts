import { ErrorCode, HttpException } from "./roots";

export class UnauthorizedException extends HttpException {
   constructor(message:string,errorCode:ErrorCode,errors:any) {
          super(message,400,errorCode,errors,false)
      }
}