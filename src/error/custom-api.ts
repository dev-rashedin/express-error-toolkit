import { StatusCodes } from "../constants/httpStatus";

class CustomAPIError extends Error {

  public statusCode: number;
  public details: string | object | null;

  constructor(message: string, statusCode: number = StatusCodes.UNAUTHORIZED, details: string | object | null  = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}


export default CustomAPIError;