import { HttpService } from "../http";
import { prepareErrorResponse, prepareResponseObject } from "../http/response";
import { RESPONSE_TYPES } from "../../constants/response-types";
import Cookies from "js-cookie";
import { getAuthCookieName } from "src/utils/auth";
import { AxiosResponse } from "axios";

export class AuthService extends HttpService {
  signOut = async (/* _baseAuthUrl: string */): Promise<allAnyTypes> => {
    try {
      Cookies.remove(getAuthCookieName(process.env.REACT_APP_ENV));
      localStorage.clear();
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  signIn = async (
    baseAuthUrl: string,
    data: Record<string, string>
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.post(
        `${baseAuthUrl}/auth/signin`,
        data,
        undefined
      );
      
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      return prepareErrorResponse(error);
    }
  };
}
