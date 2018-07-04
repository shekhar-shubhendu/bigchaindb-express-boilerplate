import Orm from 'bigchaindb-orm';
import bdbConfig from '../configs/bigchaindb.config.json';
import assetConfig from '../configs/asset.config.json';

export default class ORMService {
  constructor(){
    this.setupORM();
  }
  getModel (assetName) {
    return this.bdbORM.models[assetName];
  }

  setupORM () {
    if (bdbConfig.auth.required) {
      this.bdbORM = new Orm(bdbConfig.host, {
        app_id: bdbConfig.auth.app_id,
        app_key: bdbConfig.auth.app_key
      });
    } else {
      this.bdbORM = new Orm(bdbConfig.host);
    }
    for (const asset of assetConfig.assets) {
      this.bdbORM.define(asset.name, asset.schema);
    }
  }
}
