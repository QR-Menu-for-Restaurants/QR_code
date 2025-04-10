import logger from "../config/winston.config.js";

export const ErrorHandlerMiddleware = (error,_,response,__) => {
    logger.error(error.message);
    if (error?.code==11000) {
        
        return response.status(409).send({
            message:error.message
        })
    }
    if (error.isException) {        
        response.status(error.statusCode).send({
            message: error.message
        });
    } else {
        console.error(error);
        response.status(500).send({
            message: "Server Error"
        });
    }   
}