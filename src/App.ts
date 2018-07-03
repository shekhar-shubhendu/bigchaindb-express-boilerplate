import * as express from 'express';
import Orm from 'bigchaindb-orm';
import AssetCRABRouter from './routes/AssetCRABRouter';
const bdbConfig = require('../configs/bigchaindb.config.json');
const assetConfig = require('../configs/asset.config.json');

class App {
  public express;
  bdbOrm : any;


  constructor () {
    this.express = express();
    if(bdbConfig.auth.required){
      this.bdbOrm = new Orm(bdbConfig.host,
      {
        "app_id": bdbConfig.auth.app_id,
        "app_key": bdbConfig.auth.app_key
      });
    } else {
    this.bdbOrm = new Orm(bdbConfig.host);
    }
    this.bdbOrm.define(assetConfig.name, assetConfig.schema);
    this.express.set('json spaces', 2);
    this.express.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const CRABRouter = new AssetCRABRouter(express, this.bdbOrm, assetConfig.name).getRouter();
    this.express.use('/' + assetConfig.name , CRABRouter);
  }
}

export default new App().express