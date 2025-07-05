import { StatusCodes } from "../constants/httpStatus";
import CustomAPIError from "./custom-api";


class BadRequestError extends CustomAPIError {
  constructor(message: string, details: string | object | null = null) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

export default BadRequestError;