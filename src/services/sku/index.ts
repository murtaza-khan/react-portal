/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import { AxiosResponse } from 'axios';

export class SkuService extends HttpService {
  fetchSkuIds = async (baseAuthUrl: string, queryParams: Record<string, allAnyTypes>): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/api/v1/product/portal`, queryParams);
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}