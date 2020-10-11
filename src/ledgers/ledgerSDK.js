import BtcLedger from "./btcLedger";
import LtcLedger from "./ltcLedger";
import EthLedger from "./ethLedger";

const TEST_NET = true;

export default class LedgerSDK {
  static async create(coinType, testNet = TEST_NET) {
    const sdk = new LedgerSDK();
    await sdk._convertError(sdk._init(coinType, testNet));
    return sdk;
  }

  async _init(coinType, testNet) {
    this.coinType = coinType;
    this.testNet = testNet;
    switch (this.coinType) {
      case "BTC":
        this.coinLedger = new BtcLedger();
        await this.coinLedger.init(testNet);
        break;
      case "LTC":
        this.coinLedger = new LtcLedger();
        await this.coinLedger.init(testNet);
        break;
      case "ETH":
        this.coinLedger = new EthLedger();
        await this.coinLedger.init(testNet);
        break;
      default:
        throw new Error("LedgerSDK: Unsupported coin type.");
    }
  }

  async getAddressAndPublicKey(path) {
    return await this._convertError(this.coinLedger.getAddressAndPublicKey(path));
  }

  async signTransaction(params) {
    return await this._convertError(this.coinLedger.signTransaction(params));
  }

  async _convertError(promise) {
    try {
      return await promise;
    } catch (error) {
      error.__ledgerError = false;
      error.__showMessage = true;
      throw error;
    }
  }
}
