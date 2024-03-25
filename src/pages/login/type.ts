export interface LoginData {
  email: string;
  password: string;
}
export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}
