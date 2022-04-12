/* eslint-disable padding-line-between-statements */
import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';

export class AppService extends HttpService {
  fetchAppData = async (baseAuthUrl: string): Promise<any>  => {
    try {
      // Example of an API call to fetch the app-data
      // This would be consumed in an async action
      const apiResponse = await this.post(`${baseAuthUrl}app`,
        undefined );

      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllCompanies = async (baseAuthUrl: string): Promise<any>  => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/company/getAllCompanies`);
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchBusinessUnits = async (baseAuthUrl: string, companyId: string): Promise<any>  => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/businessUnit`,
      {
        company_id: companyId
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllLocations = async (baseAuthUrl: string, companyId: string, businessUnitId: string): Promise<any>  => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/location/getAllLocations`,
      {
        company_id: companyId,
        business_unit_id: businessUnitId
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchAllCustomers = async (baseAuthUrl: string, locationId: string): Promise<any>  => {
    try {
      const apiResponse = await this.get(`${baseAuthUrl}/user/customer/byLocation`,
      {
        locationId,
        select: "id,name,phone"
      });
      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
