import Transport from "@ledgerhq/hw-transport-u2f";
import App from "@ledgerhq/hw-app-btc";
import bitcore from "bitcore-lib";
import Debug from "debug";

const debug = Debug("BtcLedger");

export default class BtcLedger {
  async init(testNet) {
    this.transport = await Transport.create();
    this.testNet = testNet;
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
    const result = await this.app.getWalletPublicKey(path);
    return {
      publicKey: this.getCompressPublicKey(result.publicKey),
      address: "",
    };
  }

  async signTransaction(params) {
    debug("params is %O", params);
    const {
      public_key,
      ledger_path,
      public_keys,
      require_keys,
      tx_param: { tx_inputs, tx_content },
      tx_signatures,
    } = params;

    const pk = (await this.getAddressAndPublicKey(ledger_path)).publicKey;
    if (pk !== public_key) {
      throw new Error("BtcLedger: Public key check failed.");
    }
    debug("pk is %O", pk);

    const tx = new bitcore.Transaction(tx_content);
    tx.inputs = [];
    for (const input of tx_inputs) {
      const utxo = {
        txid: input.prev_tx_id,
        vout: input.output_index,
        scriptPubKey: input.script_pub_key,
        satoshis: bitcore.Unit.fromBTC(input.amount).toSatoshis(),
      };
      tx.from(utxo, public_keys, require_keys);
    }
    debug("tx is %O", tx);

    const ledgerTxs = [];
    const ledgerTxPaths = [];
    const redeemScript = bitcore.Script.buildMultisigOut(public_keys, require_keys);

    for (const input of tx_inputs) {
      const { raw_input, output_index } = input;
      const ledgerTx = this.app.splitTransaction(raw_input, true);

      ledgerTxs.push([ledgerTx, output_index, redeemScript.toHex()]);
      ledgerTxPaths.push(ledger_path);
    }
    const signs = await this.app.signP2SHTransaction(
      ledgerTxs,
      ledgerTxPaths,
      this.app
        .serializeTransactionOutputs(this.app.splitTransaction(tx.toString(), true))
        .toString("hex"),
      tx.nLockTime,
      bitcore.crypto.Signature.SIGHASH_ALL,
      false,
      tx.version,
    );

    const signatures = { public_key: pk, signatures: signs };
    debug("signatures is %O", signatures);

    for (let j = 0; j < signatures.signatures.length; j++) {
      const s = {
        inputIndex: j,
        signature: bitcore.crypto.Signature.fromString(signatures.signatures[j]),
        sigtype: bitcore.crypto.Signature.SIGHASH_ALL,
        publicKey: bitcore.PublicKey(signatures.public_key),
      };
      if (!tx.isValidSignature(s)) {
        throw new Error("BtcLedger: Signature is invalid.");
      }
    }

    const totalSignatures = [...tx_signatures, signatures];
    debug("totalSignatures is %O", totalSignatures);

    let transaction = "";
    if (totalSignatures.length === require_keys) {
      for (let i = 0; i < totalSignatures.length; i++) {
        const signatures = totalSignatures[i];

        for (let j = 0; j < signatures.signatures.length; j++) {
          const s = {
            inputIndex: j,
            signature: bitcore.crypto.Signature.fromString(signatures.signatures[j]),
            sigtype: bitcore.crypto.Signature.SIGHASH_ALL,
            publicKey: bitcore.PublicKey(signatures.public_key),
          };
          if (!tx.isValidSignature(s)) {
            throw new Error("BtcLedger: Signature is invalid.");
          }
          tx.applySignature(s);
        }
      }
      if (!tx.isFullySigned()) {
        throw new Error("BtcLedger: Transaction is not fully signed.");
      }
      transaction = tx.toString();
    }
    debug("transaction is %O", transaction);

    return { transaction, signatures };
  }
}
