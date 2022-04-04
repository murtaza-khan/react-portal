import { combineReducers } from 'redux';
import { appFeatureReducer } from './app';
import { authFeatureReducer } from './auth';


const featuresReducer = combineReducers({
  app: appFeatureReducer,
  auth: authFeatureReducer,
  /**
   * More feature reducers will be added here
   */
});

export { featuresReducer };
