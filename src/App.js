import express from 'express';
import Orm from 'bigchaindb-orm';
import AssetCRABRouter from './routes/AssetCRABRouter';
import bdbConfig from './configs/bigchaindb.config.json';
import assetConfig from './configs/asset.config.json';

class App {
  constructor () {
    this.assets = assetConfig.assets;
    this.express = express();
    this.configureServer();
    this.setupORM();
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

  setupORM () {
    if (bdbConfig.auth.required) {
      this.bdbORM = new Orm(bdbConfig.host,
        {
          app_id: bdbConfig.auth.app_id,
          app_key: bdbConfig.auth.app_key
        });
    } else {
      this.bdbORM = new Orm(bdbConfig.host);
    }
  }

  setupRoutes () {
    for (let i = 0; i < this.assets.length; i += 1) {
      this.bdbORM.define(this.assets[i].name, this.assets[i].schema);
      const CRABRouter = new AssetCRABRouter(express, this.bdbORM, this.assets[i].name).getRouter();
      this.express.use(`/${this.assets[i].name}`, CRABRouter);
    }
  }
}

export default new App().express;
