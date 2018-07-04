import BaseRouter from '../base/BaseRouter';

export default class AssetCRABRouter extends BaseRouter {
  constructor (express, bdbORM, assetName) {
    super(express, bdbORM, assetName);
  }

  registerRoutes () {
    this.router.post('/', (req, res) => {
      const userKeypair = req.body.keypair;
      const metadata = req.body.metadata;
      // Verify payload received and then process it further
      this.createAsset(userKeypair, metadata).then((value) => {
        res.json(value);
      });
    });

    this.router.get('/:assetid', (req, res) => {
      const assetid = req.params.assetid;
      // Verify payload received and then process it further
      this.retrieveAsset(assetid).then((value) => {
        res.json(value);
      });
    });

    this.router.get('/', (req, res) => {
      // Verify payload received and then process it further
      this.retrieveAllAssets().then((value) => {
        res.json(value);
      });
    });

    this.router.put('/:assetid', (req, res) => {
      const userKeypair = req.body.keypair;
      const metadata = req.body.metadata;
      const topublickey = req.body.topublickey;
      const assetid = req.params.assetid;
      this.appendAsset(assetid, userKeypair, topublickey, metadata).then((value) => {
        res.json(value);
      });
    });

    this.router.delete('/:assetid', (req, res) => {
      const userKeypair = req.body.keypair;
      const assetid = req.params.assetid;
      this.burnAsset(assetid, userKeypair).then((value) => {
        res.json(value);
      });
    });
  }

  createAsset (userKeypair, metadata) {
    return this.bdbORM.models[this.assetName].create({
      keypair: userKeypair,
      data: metadata
    }).then((asset) => asset).catch((error) => Promise.resolve({ error }));
  }

  retrieveAsset (assetid) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset).catch((error) => Promise.resolve({ error }));
  }

  retrieveAllAssets () {
    return this.bdbORM.models[this.assetName]
      .retrieve()
      .then((asset) => asset).catch((error) => Promise.resolve({ error }));
  }

  appendAsset (assetid, userKeypair, toPublicKey, metadata) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset.append({
        toPublicKey,
        keypair: userKeypair,
        data: metadata
      })).catch((error) => Promise.resolve({ error }));
  }

  burnAsset (assetid, userKeypair) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset.burn({
        keypair: userKeypair
      })).catch((error) => Promise.resolve({ error }));
  }

  getRouter () {
    return this.router;
  }
}
