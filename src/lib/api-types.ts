/**
 * Global API Response Pattern
 * Used to standardize communication between Backend and Frontend.
 */

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      errorMessage?: never;
      statusCode: number;
    }
  | {
      success: false;
      data?: never;
      errorMessage: string;
      statusCode: number;
    };
