

export class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    success: boolean;
    errors: any;
    constructor(message:string,statusCode:number,errorCode:ErrorCode,errors: any,success: boolean) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errors = errors;
        this.success = success;
    }
}


export enum ErrorCode {
    BAD_REQUEST = 10001,
    NOT_FOUND = 10002,
    INTERNAL_ERROR = 10003,
    UNAUTHORISED_EXCEPTION = 2001,
    UNPROCESSABLE_ENTITY_ERROR = 1004
}