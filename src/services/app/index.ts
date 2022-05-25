/* eslint-disable padding-line-between-statements */
import { HttpService } from "../http";
import { prepareErrorResponse, prepareResponseObject } from "../http/response";
import { RESPONSE_TYPES } from "../../constants/response-types";

export class AppService extends HttpService {
  fetchAppData = async (baseAuthUrl: string): Promise<any> => {
    try {
      // Example of an API call to fetch the app-data
      // This would be consumed in an async action
      const apiResponse = await this.post(`${baseAuthUrl}app`, undefined);

      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllCompanies = async (baseAuthUrl: string): Promise<any> => {
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
  ): Promise<any> => {
    const apiData: Record<string, any> = {};
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
  ): Promise<any> => {
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
      perPage,
      pageNo,
      searchOnAttributes,
      searchValue,
    }: {
      perPage: string;
      pageNo: string;
      searchOnAttributes?: string;
      searchValue?: string;
    }
  ): Promise<any> => {
    try {
      const apiResponse = await this.get(
        `${baseAuthUrl}/user/customer/byLocation`,
        {
          select: "id,name,phone,email,address",
          ...(searchValue && {searchValue, searchOnAttributes}),
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
