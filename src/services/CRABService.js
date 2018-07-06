import ORMService from './ORMService';

export default class CRABService {
  /**
   * @param {string} assetName name of the asset
   */
  constructor(assetName) {
    this.assetModel = new ORMService().getModel(assetName);
  }

  /**
   * Create the Asset on BigchainDB
   *
   * @param {Object} userKeypair Ed25519 keypair
   * @param {Object} metadata Metadata that will be used during asset creation
   */
  createAsset(userKeypair, metadata) {
    return this.assetModel.create({
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
  retrieveAsset(assetid) {
    return this.assetModel
      .retrieve(assetid)
      .then((asset) => asset).catch((error) => Promise.resolve({
        error
      }));
  }

  /**
   *
   * Retrieve all the assets(of this asset type)
   */
  retrieveAllAssets() {
    return this.assetModel
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
  appendAsset(assetid, userKeypair, toPublicKey, metadata) {
    return this.assetModel
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
  burnAsset(assetid, userKeypair) {
    return this.assetModel
      .retrieve(assetid)
      .then((asset) => asset.burn({
        keypair: userKeypair
      })).catch((error) => Promise.resolve({
        error
      }));
  }
}