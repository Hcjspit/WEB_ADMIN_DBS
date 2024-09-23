import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-Found";
import { validationErrorHandler } from "./validation";

export const errorHandlers = [
  notFoundHandler,
  validationErrorHandler,
  genericHandler,
];
