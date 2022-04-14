import { combineReducers } from 'redux';
import { appEntityReducer } from './app';
import { couponEntityReducer } from './coupon';


const entitiesReducer = combineReducers({
  app: appEntityReducer,
  coupon: couponEntityReducer
  /**
   * More entity reducers will be added here
   */
});

export { entitiesReducer };
