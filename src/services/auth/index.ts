import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import { LocalStorageService } from '../local-storage';
// import { ROLES } from '../../constants/roles';

const localStorageService = new LocalStorageService();
export class AuthService extends HttpService {
  signOut = async (/* _baseAuthUrl: string */): Promise<any> => {
    try {
      localStorageService.remove('user');
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
