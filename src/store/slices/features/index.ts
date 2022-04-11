import { combineReducers } from 'redux';
import { appFeatureReducer } from './app';
import { authFeatureReducer } from './auth';
import { couponFeatureReducer } from './coupon';


const featuresReducer = combineReducers({
  app: appFeatureReducer,
  auth: authFeatureReducer,
  coupon: couponFeatureReducer,
  /**
   * More feature reducers will be added here
   */
});

export { featuresReducer };
