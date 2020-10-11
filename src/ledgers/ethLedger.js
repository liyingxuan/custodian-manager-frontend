import Transport from "@ledgerhq/hw-transport-u2f";
import App from "@ledgerhq/hw-app-eth";
import Debug from "debug";

const debug = Debug("EthLedger");

export default class EthLedger {
  async init(testNet) {
    this.testNet = testNet;
    this.transport = await Transport.create();
    this.app = new App(this.transport);
  }

  getCompressPublicKey(uncompressedKey) {
    let prefix;
    if (parseInt(uncompressedKey.substring(128, 130), 16) % 2 !== 0) {
      prefix = "03";
    } else {
      prefix = "02";
    }
    const result = prefix + uncompressedKey.substring(2, 66);
    return result;
  }

  async getAddressAndPublicKey(path) {
    const result = await this.app.getAddress(path);
    return {
      publicKey: this.getCompressPublicKey(result.publicKey),
      address: result.address,
    };
  }

  async signTransaction(params) {
    debug("params is %O", params);
    const {
      public_key,
      ledger_path,
      tx_param: { tx_content },
    } = params;

    const pk = (await this.getAddressAndPublicKey(ledger_path)).publicKey;
    if (pk !== public_key) {
      throw new Error("EthLedger: Public key check failed.");
    }
    debug("pk is %O", pk);

    const txData = Buffer.from(tx_content).toString("hex");
    debug("txData is %O", txData);

    const result = await this.app.signPersonalMessage(ledger_path, txData);
    const transaction = "0x" + result.r + result.s + result.v;
    debug("transaction is %O", transaction);

    return {
      transaction,
      signatures: {},
    };
  }
}
