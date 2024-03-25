import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "http://localhost:8000";

const axiosBase = axios.create({
  baseURL: BASE_URL,
});

interface StatusCode {
  OK: number;
  BAD_REQUEST: number;
  NOT_FOUND: number;
  FORBIDDEN: number;
  UNAUTHORIZED: number;
}

const statusCode: StatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

interface RestClientConfig extends AxiosRequestConfig {
  isFormData?: boolean;
}

export default class RestClient {
  config: RestClientConfig;

  constructor(config: RestClientConfig = {}) {
    this.config = { ...config };
  }

  async get<T>(url: string, params = {}, config: RestClientConfig = {}) {
    return this.executeRequest<T>(url, {
      params,
      ...config,
    });
  }

  async post<T>(url: string, data = {}, config: RestClientConfig = {}) {
    return this.executeRequest<T>(url, {
      method: "POST",
      data,
      ...config,
    });
  }
  async put<T>(url: string, data = {}, config: RestClientConfig = {}) {
    return this.executeRequest<T>(url, {
      method: "PUT",
      data,
      ...config,
    });
  }

  async executeRequest<T>(url: string, config: RestClientConfig): Promise<T> {
    const token = localStorage.getItem("token") || "";

    let finalHeaderConfig = {
      ...config.headers,
      ...this.config.headers,
      authorization: `Bearer ${token}`,
    };

    if (config.isFormData) {
      finalHeaderConfig = {
        ...finalHeaderConfig,
        "Content-Type": "multipart/form-data",
      };
    }

    const finalConfig: RestClientConfig = {
      ...this.config,
      ...config,
      url,
      headers: {
        ...finalHeaderConfig,
      },
    };

    try {
      const res: AxiosResponse<T> = await axiosBase.request(finalConfig);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode: number = error.response!.status;
        if (errorCode === statusCode.UNAUTHORIZED) {
          try {
            // Call API to refresh token
            const refreshedToken = await this.refreshToken();
            if (refreshedToken) {
              // Retry the original request with the new token
              return this.executeRequest<T>(url, config);
            } else {
              // Redirect to login page or do something else
            }
          } catch (refreshError) {

            // Handle refresh token error
            // Redirect to login page or do something else
          }
        } else if (errorCode === statusCode.FORBIDDEN) {
          // Redirect to home page or handle forbidden error
        } else if (errorCode === statusCode.NOT_FOUND) {
          // Redirect to not found page or handle not found error
        }
      }
      throw error;
    }
  }

  async refreshToken(): Promise<string | null> {
    // const refreshToken = localStorage.getItem("refreshToken") || "";

    // Logic to refresh token
    return null; // Placeholder, replace with refreshed token
  }
}
