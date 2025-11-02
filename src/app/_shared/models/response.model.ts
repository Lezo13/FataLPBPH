export type Response<T> = {
  data?: T;
  isSuccessful?: boolean;
  message?: string;
  errorCode?: string;
  statusCode?: number;
};


export type ErrorResponse = {
  code: string;
};
