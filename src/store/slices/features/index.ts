import { combineReducers } from 'redux';
import { appFeatureReducer } from './app';


const featuresReducer = combineReducers({
  app: appFeatureReducer,
  /**
   * More feature reducers will be added here
   */
});

export { featuresReducer };
