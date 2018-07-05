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
      this.assets.push(asset.name);
    }
  }

  getModel(assetName) {
    return this.bdbORM.models[assetName];
  }
  
}

export default ORMService;