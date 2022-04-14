/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';

export class CouponService extends HttpService {
  fetchCoupons = async (baseAuthUrl: string, queryParams: Record<string, any>): Promise<any>  => {
    const { page, perPage, search, locationId } = queryParams;
    const apiData: Record<string, any> = { page, perPage };
    if (search) {
      apiData.search = search;
    }
    if (locationId) {
      apiData.locationId = locationId;
    }
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/coupons/`, {...apiData});
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
  updateCoupon = async (baseAuthUrl: string, payload: Record<string, any>): Promise<any>  => {
    const { id, description, disabled, hideOnWallet } = payload;
    try {
      const apiResponse = await this.put(`${baseAuthUrl}/coupons/${id}`, {
        description,
        disabled,
        hideOnWallet,
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
