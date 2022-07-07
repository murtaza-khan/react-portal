import { createBrowserHistory } from 'history';
import { MAIN_ROUTE } from 'src/constants/navigation-routes';

export default createBrowserHistory({
  basename: MAIN_ROUTE,
});
