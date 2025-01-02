import { ErrorCode, HttpException } from "./roots";


export class UnprocessableEntity extends HttpException {
    constructor(message:string,errors: any, errorCode:ErrorCode) {
        super(message,422,ErrorCode.UNPROCESSABLE_ENTITY_ERROR,errors,false)
    }
}