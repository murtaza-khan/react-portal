/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';
import { AxiosResponse } from 'axios';

export class AppService extends HttpService {
  fetchAllCompanies = async (baseAuthUrl: string): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.get(
        `${baseAuthUrl}/config/company/getAll`
      );
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchBusinessUnits = async (
    baseAuthUrl: string,
    companyId: string
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    const apiData: Record<string, string> = {};
    if (companyId) {
      apiData.companyId = companyId;
    }
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/config/businessunit/getAll`, { ...apiData });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllLocations = async (
    baseAuthUrl: string,
    companyId: string,
    businessUnitId: string
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.get(
        `${baseAuthUrl}/config/location/getAll`,
        {
          companyId,
          businessUnitId,
        }
      );
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllCustomers = async (
    baseAuthUrl: string,
    {
      companyId,
      perPage,
      pageNo,
      searchOnAttributes,
      searchValue,
    }: {
      companyId: string;
      perPage: string;
      pageNo: string;
      searchOnAttributes?: string;
      searchValue?: string;
    }
  ): Promise<IPrepareResponse<AxiosResponse>> => {
    try {
      const apiResponse = await this.get(
        `${baseAuthUrl}/user/customer/byLocation`,
        {
          companyId,
          select: 'id,name,phone,email,address',
          ...searchValue && {searchValue, searchOnAttributes},
          limit: perPage,
          pageNo: pageNo,
        }
      );
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
