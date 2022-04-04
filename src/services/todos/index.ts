import { HttpService } from '../http';
import { prepareErrorResponse, prepareResponseObject } from '../http/response';
import { RESPONSE_TYPES } from '../../constants/response-types';

// const INITIAL_STATE = {
//   baseUrl: process.env.REACT_BASE_URL || '',
//   validationStates: {
//     isLoading: false,
//     error: null,
//   },
// };

export class TodosService extends HttpService {
  fetchTodosList = async (): Promise<any> => {
    try {
      // Example of an API call to fetch the app-data
      // This would be consumed in an async action
      const apiResponse = await this.get(`https://jsonplaceholder.typicode.com/todos`,
        undefined);

      // return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
      return apiResponse;
    } catch (error) {
      // throw prepareErrorResponse(error);
      throw error;
    }
  };
  addTodo = async (data: ITodo): Promise<any> => {
    try {
      const apiResponse = await this.post(`https://jsonplaceholder.typicode.com/todos`, data,
        undefined);

      // return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
      return apiResponse;
    } catch (error) {
      // throw prepareErrorResponse(error);
      throw error;
    }
  };

  signUp = async (baseUrl: string, data: Record<string, any>): Promise<any> => {
    try {
      const apiResponse = await this.post(`${baseUrl}/sign-up`, data,
        undefined);

      return prepareResponseObject(apiResponse, RESPONSE_TYPES.SUCCESS);
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
