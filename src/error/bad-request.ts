import { StatusCodes } from "http-status-toolkit";
import {CustomAPIError} from "./custom-api";


export class BadRequestError extends CustomAPIError {
  constructor(message: string, details: string | object | null = null) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}
