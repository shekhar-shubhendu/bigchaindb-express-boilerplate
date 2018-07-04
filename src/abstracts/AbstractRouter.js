import * as bodyParser from 'body-parser';

export default class AbstractRouter {
  /**
     *
     * @param {Object} express an object of express app
     */
  constructor (express) {
    if (this.constructor === AbstractRouter) {
      throw new TypeError('Cannot construct instances of abstract class BaseRouter directly. Must extend it.');
    }
    if (this.registerRoutes === AbstractRouter.prototype.registerRoutes) {
      throw new TypeError('Must implement/override abstract method registerRoutes');
    }
    if (this.getRouter === AbstractRouter.prototype.getRouter) {
      throw new TypeError('Must implement/override abstract method getRouter');
    }
    this.express = express;
    this.router = this.express.Router();
    this.router.use(bodyParser.urlencoded({
      extended: false
    }));
    this.router.use(bodyParser.json());
    this.registerRoutes();
  }

  registerRoutes () {
    throw new TypeError('Do not call abstract method registerRoutes from child.');
  }

  getRouter () {
    throw new TypeError('Do not call abstract method getRouter from child.');
  }
}
