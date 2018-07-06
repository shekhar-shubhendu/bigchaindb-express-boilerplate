import Orm from 'bigchaindb-orm';
import bdbConfig from '../configs/bigchaindb.config.json';
import assetConfig from '../configs/asset.config.json';

let instance = null;

class ORMService {
  constructor() {
    if (!instance) {
      instance = this;
      this.assets = [];
      this.setupORM();
    }
    return instance;
  }

  setupORM() {
    const URL = `${bdbConfig.host}${bdbConfig.api}`;
    this.bdbORM = new Orm(URL);
    if (bdbConfig.auth.required) {
      this.bdbORM = new Orm(URL, {
        app_id: bdbConfig.auth.app_id,
        app_key: bdbConfig.auth.app_key
      });
    }
    for (const asset of assetConfig.assets) {
      this.bdbORM.define(asset.name, asset.schema);
      this.assets.push(asset.name);
    }
  }

  getModel(assetName) {
    return this.bdbORM.models[assetName];
  }
  
}

export default ORMService;