import BaseRouter from '../base/BaseRouter';

export default class AssetCRABRouter extends BaseRouter {
  /**
     *
     * @param {Object} express an object of express app
     * @param {Object} bdbORM an object of bigchaindb-orm
     * @param {string} assetName name of the asset
     */
  constructor (express, bdbORM, assetName) {
    super(express, bdbORM, assetName);
  }

  /**
     * Overriden from BaseRouter
     * Returns the initialized Router
     */
  getRouter () {
    return this.router;
  }

  /**
     * Overriden from BaseRouter
     * Required by BaseRouter to initialize and register routes
     */
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

  /**
     * Create the Asset on BigchainDB
     *
     * @param {Object} userKeypair Ed25519 keypair
     * @param {Object} metadata Metadata that will be used during asset creation
     */
  createAsset (userKeypair, metadata) {
    return this.bdbORM.models[this.assetName].create({
      keypair: userKeypair,
      data: metadata
    }).then((asset) => asset).catch((error) => Promise.resolve({
      error
    }));
  }

  /**
     * Retrieve the Asset using asset id
     *
     * @param {string} assetid asset id of the asset created on blockchain
     */
  retrieveAsset (assetid) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset).catch((error) => Promise.resolve({
        error
      }));
  }

  /**
     *
     * Retrieve all the assets(of this asset type)
     */
  retrieveAllAssets () {
    return this.bdbORM.models[this.assetName]
      .retrieve()
      .then((asset) => asset).catch((error) => Promise.resolve({
        error
      }));
  }

  /**
     *
     * Append/Update/Spend the asset
     *
     * @param {string} assetid asset id of the asset created on blockchain
     * @param {Object} userKeypair Ed25519 keypair
     * @param {string} toPublicKey publicKey
     * @param {Object} metadata Asset Metadata
     */
  appendAsset (assetid, userKeypair, toPublicKey, metadata) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset.append({
        toPublicKey,
        keypair: userKeypair,
        data: metadata
      })).catch((error) => Promise.resolve({
        error
      }));
  }

  /**
     *
     * Burn/Mark the asset unspendable
     *
     * @param {string} assetid asset id of the asset created on blockchain
     * @param {Object} userKeypair Ed25519 keypair
     */
  burnAsset (assetid, userKeypair) {
    return this.bdbORM.models[this.assetName]
      .retrieve(assetid)
      .then((asset) => asset.burn({
        keypair: userKeypair
      })).catch((error) => Promise.resolve({
        error
      }));
  }
}
