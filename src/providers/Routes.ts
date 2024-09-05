import {Application} from 'express'; 
import Locals from "./Locals";

import apiRouter from "./../routes/Api";

class Routes {
  public mountApi(_express: Application) {
    const apiPrefix = Locals.config().apiPrefix;
    const apiVersion = Locals.config().apiVersion;
    const baseUrl = `/${apiPrefix}/${apiVersion}`;
    return _express.use(baseUrl, apiRouter);
  }
}

export default new Routes();
