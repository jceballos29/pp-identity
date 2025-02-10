import { HttpStatusCode } from "../types";

export class CustomError extends Error {
  statusCode: number;
  status: string;
  errors?: string[];

  constructor(message: string, statusCode: HttpStatusCode, errors?: string[]) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.errors = errors;
      Error.captureStackTrace(this, this.constructor);
  }
}