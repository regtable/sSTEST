import CryptoJS from "https://esm.sh/crypto-js@4.2.0";
import process from "https://esm.sh/process@0.11.10";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'justfuvkingmadness';

const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  const base64EncodedData = btoa(encryptedData); // Base64 encoding
  return base64EncodedData;
};

const decryptData = (base64EncodedData) => {
  const encryptedData = atob(base64EncodedData); // Base64 decoding
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export { encryptData, decryptData };