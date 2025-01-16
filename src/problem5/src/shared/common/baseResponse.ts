
import { StatusCodes } from "../constants/statusCode";

export class BaseResponse<T = null> {
  readonly message: string;
  readonly data: T;
  readonly statusCode: number;

  private constructor(message: string, data: T, statusCode: number) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }

  static success<T>(message: string, responseObject: T, statusCode: number = StatusCodes.OK) {
    return new BaseResponse(message, responseObject, statusCode);
  }

  static failure<T>(message: string, responseObject: T, statusCode: number = StatusCodes.BAD_REQUEST) {
    return new BaseResponse(message, responseObject, statusCode);
  }
}


