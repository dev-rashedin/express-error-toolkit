import { StatusCodes } from "../constants/httpStatus";
import CustomAPIError from "./custom-api";


class UnauthenticatedError extends CustomAPIError {
  constructor(message: string, details: string | object | null = null) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

export default UnauthenticatedError;