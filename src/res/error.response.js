const StatusCode ={
    FORBIDDEN: 403,
    CONFLICT: 409,
}

const ReasonStatus = {
    FORBIDDEN: 'Bad request',
    CONFLICT: 'Conflict',
}

const {
    StatusCodes, 
    ReasonPhrases
} = require('./httpStatusCode')



class ErrorResponse extends Error {
    constructor(message, status){
        super(message);
        this.status = status;
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatus.CONFLICT, statusCode = StatusCode.CONFLICT){
        super(message, statusCode);
    }

}
class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatus.FORBIDDEN, statusCode = StatusCode.FORBIDDEN){
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message=ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED){
        super(message, statusCode)
    }
}
class NotFoundError extends ErrorResponse{
    constructor(message=ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND){
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError
}