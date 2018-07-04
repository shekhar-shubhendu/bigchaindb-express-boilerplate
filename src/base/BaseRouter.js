import * as bodyParser from 'body-parser';

export default class BaseRouter {
  constructor (express, bdbORM, assetName) {
    if (new.target === BaseRouter) {
      throw new TypeError('Cannot construct BaseRouter instances directly');
    }
    this.validateInstance();
    this.express = express;
    this.bdbORM = bdbORM;
    this.assetName = assetName;
    this.router = this.express.Router();
    this.router.use(bodyParser.urlencoded({
      extended: false
    }));
    this.router.use(bodyParser.json());
    this.registerRoutes();
  }

  validateInstance () {
    if (this.registerRoutes === undefined || typeof this.registerRoutes !== 'function') {
      throw new TypeError('Must declare/override method registerRoutes');
    }
    if (this.getRouter === undefined || typeof this.getRouter !== 'function') {
      throw new TypeError('Must declare/override method getRouter');
    }
  }
}
