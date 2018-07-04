import express from 'express';
import AssetCRABRouter from './routers/AssetCRABRouter';
import assetConfig from './configs/asset.config.json';
import ORMService from './services/ORMService';

class App {
  constructor () {
    this.assets = assetConfig.assets;
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
    for (const asset of this.assets) {
      const CRABRouter = new AssetCRABRouter(express, this.ormService, asset.name).getRouter();
      this.express.use(`/api/v1/${asset.name}`, CRABRouter);
    }
  }
}

export default new App().express;
