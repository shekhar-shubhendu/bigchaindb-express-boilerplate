import express from 'express';
import AssetCRABRouter from './routers/AssetCRABRouter';
import ORMService from './services/ORMService';

class App {
  constructor () {
    this.express = express();
    this.ormService = new ORMService();
    this.configureServer();
    this.setupRoutes();
  }

  configureServer () {
    this.express.set('json spaces', 2);
    this.express.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      next();
    });
  }

  setupRoutes () {
    for (const asset of this.ormService.assets) {
      const CRABRouter = new AssetCRABRouter(asset).getRouter();
      this.express.use(`/api/v1/${asset}`, CRABRouter);
    }
  }
}

export default new App().express;
