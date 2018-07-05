import * as bodyParser from 'body-parser';
import express from 'express';

export default class AbstractRouter {
  constructor() {
    if (this.constructor === AbstractRouter) {
      throw new TypeError('Cannot construct instances of abstract class BaseRouter directly. Must extend it.');
    }
    if (this.registerRoutes === AbstractRouter.prototype.registerRoutes) {
      throw new TypeError('Must implement/override abstract method registerRoutes');
    }
    if (this.getRouter === AbstractRouter.prototype.getRouter) {
      throw new TypeError('Must implement/override abstract method getRouter');
    }
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded({
      extended: false
    }));
    this.router.use(bodyParser.json());
    this.registerRoutes();
  }

  registerRoutes() {
    throw new TypeError('Do not call abstract method registerRoutes from child.');
  }

  getRouter() {
    throw new TypeError('Do not call abstract method getRouter from child.');
  }
}