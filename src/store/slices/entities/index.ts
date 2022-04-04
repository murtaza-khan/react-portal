import { combineReducers } from 'redux';
import { appEntityReducer } from './app';

const entitiesReducer = combineReducers({
  app: appEntityReducer,
  /**
   * More entity reducers will be added here
   */
});

export { entitiesReducer };
