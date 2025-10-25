export interface ErrorOptions {
  showStack: boolean;
  logError: boolean;
  introLine: string | boolean;
  autoSuccessLog: boolean;
}

export interface ErrorResponse {
  success: false;
  status: number;
  message: string;
  errorDetails?: string | object | null;
  stack?: string | string[];
}