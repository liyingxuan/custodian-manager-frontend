/*
 * **************************************************************************************
 *  Copyright © 2014-2018 Ontology Foundation Ltd.
 *  All rights reserved.
 *
 *  This software is supplied only under the terms of a license agreement,
 *  nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
 *  Use, redistribution or other disclosure of any parts of this
 *  software is prohibited except in accordance with the terms of such written
 *  agreement with Ontology Foundation Ltd. This software is confidential
 *  and proprietary information of Ontology Foundation Ltd.
 *
 * **************************************************************************************
 *
 */
import crypto from "crypto";

export function formatRSAPublicKey(publicKey) {
  if (!publicKey) {
    return "";
  }
  const lineCount = Math.ceil(publicKey.length / 64);
  const lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines.push(publicKey.slice(i * 64, i * 64 + 64));
  }
  return "-----BEGIN PUBLIC KEY-----\n" + lines.join("\n") + "-----END PUBLIC KEY-----\n";
}

export function createKey(publicKey) {
  const cipherKey = crypto.randomBytes(32);
  const rsaKey = {
    key: formatRSAPublicKey(publicKey),
    padding: crypto.constants.RSA_PKCS1_PADDING,
  };
  const encryptedKey = crypto.publicEncrypt(rsaKey, cipherKey).toString("base64");
  return { cipherKey, encryptedKey };
}

export function encrypt(key, text) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key.cipherKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, encrypted, tag]).toString("base64");
}

export function decrypt(key, encData) {
  const bData = Buffer.from(encData, "base64");
  const iv = bData.slice(0, 12);
  const text = bData.slice(12, bData.length - 16);
  const tag = bData.slice(bData.length - 16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key.cipherKey, iv);
  decipher.setAuthTag(tag);
  const decrypted = decipher.update(text, "binary", "utf8") + decipher.final("utf8");
  return decrypted;
}
