/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';

export class CustomerService extends HttpService {
  fetchCustomerIds = async (baseAuthUrl: string, queryParams: Record<string, any>): Promise<any> => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/user/customer`, queryParams);
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}