import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import { LocalStorageService } from '../local-storage';
import { ROLES } from '../../constants/roles';

const localStorageService = new LocalStorageService();
export class AuthService extends HttpService {
  signOut = async (/* _baseAuthUrl: string */): Promise<any>  => {
    try {
      localStorageService.remove('user');
      // const apiResponse = await this.post(`${baseAuthUrl}sign-out`,
      //   undefined );

      // return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  signIn = async (_baseAuthUrl: string, data: Record<string, any>): Promise<any>  => {
    try {
      // TODO uncomment this code in real implementation
      // const apiResponse = await this.post(`${baseAuthUrl}sign-in`, data,
      //   undefined);

      /** ** TEMP CODE */
      if (data.email === 'admin@test.com') {
        data.role = ROLES.ADMIN;
      } else {
        data.role = ROLES.CUSTOMER;
      }

      localStorageService.persist('user', data );
      return { data };
      /** ** TEMP CODE END */

      // return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  signUp = async (baseUrl: string, data: Record<string, any>): Promise<any>  => {
    try {
      const apiResponse = await this.post(`${baseUrl}/sign-up`, data,
        undefined );

      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
