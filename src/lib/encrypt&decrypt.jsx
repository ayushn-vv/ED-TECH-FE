// utils/encryption.js
import CryptoJS from 'crypto-js';

const defaultSecretKey = import.meta.env.VITE_APP_SECRET_KEY || 'my-32-char-secret-key-1234567890';

// URL-safe base64 helpers
const base64UrlEncode = (str) => str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const base64UrlDecode = (str) => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = output.length % 4;
  if (pad) {
    output += '='.repeat(4 - pad);
  }
  return output;
};

export function encrypt(text, secretKey = defaultSecretKey) {
  try {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(text, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    const combined = iv.concat(encrypted.ciphertext);
    const b64 = CryptoJS.enc.Base64.stringify(combined);
    return base64UrlEncode(b64);
  } catch (error) {
    console.error('Encryption failed:', error);
    return text;
  }
}

export function decrypt(cipherText, secretKey = defaultSecretKey) {
  try {
    // If it's not a string or doesn't look encrypted, return as-is
    if (typeof cipherText !== 'string' || cipherText.length < 24) {
      return cipherText;
    }

    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const b64 = base64UrlDecode(cipherText);
    const combined = CryptoJS.enc.Base64.parse(b64);

    const iv = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4), 16);
    const ciphertext = CryptoJS.lib.WordArray.create(combined.words.slice(4), combined.sigBytes - 16);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.warn('Decryption failed, returning original:', error);
    return cipherText;
  }
}

// Helper to check if a string is encrypted with this format
export function isCryptoJSEncrypted(str) {
  if (typeof str !== 'string') return false;
  try {
    const b64 = base64UrlDecode(str);
    const combined = CryptoJS.enc.Base64.parse(b64);
    return combined.sigBytes >= 16; // At least IV + some ciphertext
  } catch {
    return false;
  }
}
