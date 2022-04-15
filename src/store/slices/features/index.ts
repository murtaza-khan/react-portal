import { combineReducers } from 'redux';
import { appFeatureReducer } from './app';
import { authFeatureReducer } from './auth';
import { couponFeatureReducer } from './coupon';
import { skuFeatureReducer } from './sku';


const featuresReducer = combineReducers({
  app: appFeatureReducer,
  auth: authFeatureReducer,
  coupon: couponFeatureReducer,
  sku: skuFeatureReducer,
  /**
   * More feature reducers will be added here
   */
});

export { featuresReducer };
