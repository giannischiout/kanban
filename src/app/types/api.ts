export type ApiResponse<T> = {
  success: boolean;
  message: string;
  result: T | T[];
}

export type ApiSingleResponse<T> = {
  success: boolean;
  message: string;
  result: T ;
};