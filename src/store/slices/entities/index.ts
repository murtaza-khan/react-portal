import { combineReducers } from 'redux';
import { appEntityReducer } from './app';
import { couponEntityReducer } from './coupon';
import { skuEntityReducer } from './sku';
import { customerEntityReducer } from './customer';


const entitiesReducer = combineReducers({
  app: appEntityReducer,
  coupon: couponEntityReducer,
  sku: skuEntityReducer,
  customer: customerEntityReducer,
  /**
   * More entity reducers will be added here
   */
});

export { entitiesReducer };
