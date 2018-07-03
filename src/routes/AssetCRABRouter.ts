import * as bodyParser from 'body-parser';

export default class AssetCRABRouter {
    private AssetCRABRouter;
    constructor(private express: any, private bdbORM: any, private assetName: string) {
        this.AssetCRABRouter = this.express.Router();
        this.AssetCRABRouter.use(bodyParser.urlencoded({ extended: false }));
        this.AssetCRABRouter.use(bodyParser.json());
        this.registerRoutes();
    }

    private registerRoutes = (): void => {
        this.AssetCRABRouter.post('/', (req, res) => {
            const userKeypair = req.body.keypair;
            const metadata = req.body.metadata;
            //Verify payload received and then process it further
            this.createAsset(userKeypair, metadata).then(value => {
                res.json(value);
            });
        });

        this.AssetCRABRouter.get('/:assetid', (req, res) => {
            const assetid = req.params.assetid;
            //Verify payload received and then process it further
            this.retrieveAsset(assetid).then(value => {
                res.json(value);
            });
        });

        this.AssetCRABRouter.get('/', (req, res) => {
            //Verify payload received and then process it further
            this.retrieveAllAssets().then(value => {
                res.json(value);
            });
        });

        this.AssetCRABRouter.put('/:assetid', (req, res) => {
            const userKeypair = req.body.keypair;
            const metadata = req.body.metadata;
            const topublickey = req.body.topublickey;
            const assetid = req.params.assetid;
            this.appendAsset(assetid, userKeypair, topublickey, metadata).then(value => {
                res.json(value);
            });
        });

        this.AssetCRABRouter.delete('/:assetid', (req, res) => {
            const userKeypair = req.body.keypair;
            const assetid = req.params.assetid;
            this.burnAsset(assetid, userKeypair).then(value => {
                res.json(value);
            });
        });
    }


    private createAsset = (userKeypair: any, metadata: Object) => {
        return this.bdbORM.models[this.assetName].create({
            keypair: userKeypair,
            data: metadata
        }).then(asset => {
            return asset;
        }).catch(error => {
            return Promise.resolve({ error: error });
        });
    }

    private retrieveAsset = (id: string) => {
        return this.bdbORM.models[this.assetName]
            .retrieve(id)
            .then(asset => {
                return asset;
            }).catch(error => {
                return Promise.resolve({ error: error });
            });
    }

    private retrieveAllAssets = () => {
        return this.bdbORM.models[this.assetName]
            .retrieve()
            .then(asset => {
                return asset;
            }).catch(error => {
                return Promise.resolve({ error: error });
            });
    }

    private appendAsset = (id: string, userKeypair: any, toPublicKey: string, metadata: Object) => {
        return this.bdbORM.models[this.assetName]
            .retrieve(id)
            .then(asset => {
                return asset.append({
                    toPublicKey: toPublicKey,
                    keypair: userKeypair,
                    data: metadata
                });
            }).catch(error => {
                return Promise.resolve({ error: error });
            });
    }

    private burnAsset = (id: string, userKeypair: any) => {
        return this.bdbORM.models[this.assetName]
            .retrieve(id)
            .then(asset => {
                return asset.burn({
                    keypair: userKeypair
                });
            }).catch(error => {
                return Promise.resolve({ error: error });
            });
    }

    public getRouter = () => {
        return this.AssetCRABRouter;
    }
}