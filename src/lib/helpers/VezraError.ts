/*

is error instanceof Error
no ? send back generic unhandled
yes ? custom error response builder

is app in 
prod ? send only prod Response Body & Notify UI
dev ? send entire custom response Response Body & Notify UI

*/

import { AxiosError } from "axios";
import { ZodError } from "zod";

class AnyError extends Error {}

const ZodErrorTypeEnum = ["ZodError", "AxiosError"] as const;
type ErrorTypeEnum = (typeof ZodErrorTypeEnum)[number] | undefined;

type ErrorTypeMap = {
  ZodError: ZodError;
  AxiosError: AxiosError;
};

interface VezraErrorResBody {
  statusCode: number;
  status: string;
  message: string;
  canNotifyUser: boolean;
}

export class VezraError {
  constructor() {}

  static parse(err: unknown) {
    if (err instanceof ZodError) return this.#build(err, "ZodError");
    if (err instanceof AxiosError) return this.#build(err, "AxiosError");
    // .... cont...
    // Fallback Generic Error
    else return this.#build(err, undefined);
  }

  static #build(err: any, type: ErrorTypeEnum) {
    switch (type) {
      case "ZodError":
        return {
          statusCode: 500,
          status: "ZodError",
          message: "Internal Server Error. Try Again Later.",
          debug: {
            context: err.issues.message,
            stack: err.stack,
            err: err,
          },
        };
        //
        break;
      //
      case "AxiosError":
        return {
          statusCode: 500,
          status: "AxiosError",
          message: "Internal Server Error. Try Again Later.",
          debug: {
            context: "ZodError",
            stack: null,
            err: err,
          },
        };
        //
        break;
      //
      default:
        // Fallback Generic Error
        return {
          statusCode: 500,
          status: "Fail",
          message: "Internal Server Error. Try Again Later.",
          debug: {
            context: "{ VezraError.parse() } failed to match instanceof Error",
            stack: null,
            err: err,
          },
        };
    }
  }
}
