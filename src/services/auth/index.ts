import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import Cookies from 'js-cookie';
import { getAuthCookieName } from 'src/utils/auth';
// import { ROLES } from '../../constants/roles';

export class AuthService extends HttpService {
  signOut = async (/* _baseAuthUrl: string */): Promise<any> => {
    try {
      Cookies.remove(getAuthCookieName(process.env.REACT_APP_ENV));
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  signIn = async (
    baseAuthUrl: string,
    data: Record<string, any>
  ): Promise<any> => {
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
