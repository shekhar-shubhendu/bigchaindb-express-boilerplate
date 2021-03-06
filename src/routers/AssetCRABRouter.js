import AbstractRouter from '../abstracts/AbstractRouter';
import CRABService from '../services/CRABService';

export default class AssetCRABRouter extends AbstractRouter {
  /**
   *
   * @param {string} assetName name of the asset
   */
  constructor(assetName) {
    super();
    this.crabService = new CRABService(assetName);
  }

  /**
   * Overriden from AbstractRouter
   * Required by AbstractRouter to initialize and register routes
   */
  registerRoutes() {
    this.router.post('/', (req, res) => {
      const userKeypair = req.body.keypair;
      const metadata = req.body.metadata;
      // Verify payload received and then process it further
      this.crabService.createAsset(userKeypair, metadata).then((value) => {
        res.json(value);
      });
    });

    this.router.get('/:assetid', (req, res) => {
      const assetid = req.params.assetid;
      // Verify payload received and then process it further
      this.crabService.retrieveAsset(assetid).then((value) => {
        res.json(value);
      });
    });

    this.router.get('/', (req, res) => {
      // Verify payload received and then process it further
      this.crabService.retrieveAllAssets().then((value) => {
        res.json(value);
      });
    });

    this.router.put('/:assetid', (req, res) => {
      const userKeypair = req.body.keypair;
      const metadata = req.body.metadata;
      const topublickey = req.body.topublickey;
      const assetid = req.params.assetid;
      this.crabService.appendAsset(assetid, userKeypair, topublickey, metadata).then((value) => {
        res.json(value);
      });
    });

    this.router.delete('/:assetid', (req, res) => {
      const userKeypair = req.body.keypair;
      const assetid = req.params.assetid;
      this.crabService.burnAsset(assetid, userKeypair).then((value) => {
        res.json(value);
      });
    });
  }
}