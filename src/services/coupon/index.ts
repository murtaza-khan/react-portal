/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import { AxiosResponse } from 'axios';

export class CouponService extends HttpService {
  fetchCoupons = async (
    baseAuthUrl: string,
    queryParams: IFetchCouponsQueryParams
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    const { page, perPage, search, companyId, businessUnitId, locationId } =
      queryParams;
    const apiData:IFetchCouponsQueryParams = { page, perPage };
    if (search) {
      apiData.search = search;
    }
    if (companyId) {
      apiData.companyId = companyId;
    }
    if (businessUnitId) {
      apiData.businessUnitId = businessUnitId;
    }
    if (locationId) {
      apiData.locationId = locationId;
    }
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/coupons/`, {
        ...apiData,
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  updateCoupon = async (
    baseAuthUrl: string,
    payload: IUpdateCouponPayload
  ): Promise<IPrepareResponse<AxiosResponse>> => {
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

  createCoupon = async (
    baseAuthUrl: string,
    queryParams: ICoupon
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.post(`${baseAuthUrl}/coupons/`, {
        ...queryParams,
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
