import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import authLocal from "@/utils/localStorage";

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

  async patch<T>(url: string, data = {}, config: RestClientConfig = {}) {
    return this.executeRequest<T>(url, {
      method: "PATCH",
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

  async delete<T>(url: string, config: RestClientConfig = {}) {
    return this.executeRequest<T>(url, {
      method: "DELETE",
      ...config,
    });
  }

  async executeRequest<T>(url: string, config: RestClientConfig): Promise<T> {
    const { getInfo, removeInfo } = authLocal;
    const token: TToken = getInfo("KEY_TOKEN");

    let finalHeaderConfig = {
      ...config.headers,
      ...this.config.headers,
      authorization: `Bearer ${token?.access_token || ""}`,
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
          removeInfo("KEY_TOKEN");
          window.location.replace("/login");
        } else if (errorCode === statusCode.FORBIDDEN) {
          window.location.replace("/home");
        } else if (errorCode === statusCode.NOT_FOUND) {
          window.location.replace("/404");
        } else if (errorCode === statusCode.BAD_REQUEST) {
          removeInfo("KEY_TOKEN");
        }
      }
      throw error;
    }
  }
}
