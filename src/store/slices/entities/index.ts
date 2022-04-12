import { combineReducers } from 'redux';
import { appEntityReducer } from './app';
import { couponEntityReducer } from './coupon';
import { skuEntityReducer } from './sku';


const entitiesReducer = combineReducers({
  app: appEntityReducer,
  coupon: couponEntityReducer,
  sku: skuEntityReducer
  /**
   * More entity reducers will be added here
   */
});

export { entitiesReducer };
