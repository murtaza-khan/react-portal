import axios, { AxiosResponse } from "axios";
import queryString from "query-string";
import "./interceptors";
import Cookies from 'js-cookie';
import { getAuthCookieName } from 'src/utils/auth';

export class HttpService {
  getTimeOutDuration() {
    // all api calls will be timeout
    // if server didn't responsed in 15 seconds
    const timeOutDuration = 15000;
    return timeOutDuration;
  }

  async getHeaders(
    options?: IHttpRequestOptions
  ): Promise<Record<string, string>> {
    let headers: Record<string, string> = {};

    // eslint-disable-next-line prefer-destructuring
    if (options && options.headers) {
      const { headers: customHeaders } = options;
      headers = customHeaders;
      // return headers;
    }

    let data = { token: '', user: {} };
    const stringData = Cookies.get(getAuthCookieName(process.env.REACT_APP_ENV))!;
  
    if (stringData && stringData.length > 0) {
      data = JSON.parse(stringData!);
    }
  
    const { token } = data;
    if (token && typeof token === "string" && !headers.Authorization)
      headers.Authorization = token;

    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  }

  async get(
    url: string,
    queryParams: Record<string, allAnyTypes> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<AxiosResponse> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.get(url, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async post(
    url: string,
    postData: unknown,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);
    return axios.post(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async put(
    url: string,
    postData: unknown,
    queryParams: Record<string, allAnyTypes> | null = null,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.put(url, postData, {
      params: queryParams,
      paramsSerializer: function (params) {
        return queryString.stringify(params);
      },
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async patch(
    url: string,
    postData: unknown,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.patch(url, postData, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }

  async delete(
    url: string,
    options?: IHttpRequestOptions,
    timeOut?: number
  ): Promise<unknown> {
    const headers: Record<string, string> = await this.getHeaders(options);

    return axios.delete(url, {
      headers,
      timeout: timeOut ? timeOut : this.getTimeOutDuration(),
    });
  }
}