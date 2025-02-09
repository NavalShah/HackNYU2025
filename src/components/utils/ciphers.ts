// ciphers.ts

// Blowfish (using a library like `crypto-js`)
import CryptoJS from 'crypto-js';

// Caesar Cipher
export const caesarCipher = (text: string, shift: number, encrypt: boolean = true): string => {
  return text
    .split('')
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const offset = char === char.toLowerCase() ? 97 : 65;
        const shiftedChar = String.fromCharCode(
          ((char.charCodeAt(0) - offset + (encrypt ? shift : 26 - shift)) % 26) + offset
        );
        return shiftedChar;
      }
      return char;
    })
    .join('');
};

// Vigenère Cipher
export const vigenereCipher = (text: string, key: string, encrypt: boolean = true): string => {
  const keyLength = key.length;
  return text
    .split('')
    .map((char, index) => {
      if (char.match(/[a-z]/i)) {
        const offset = char === char.toLowerCase() ? 97 : 65;
        const keyChar = key[(index % keyLength)].toLowerCase();
        const keyShift = keyChar.charCodeAt(0) - 97;
        const shiftedChar = String.fromCharCode(
          ((char.charCodeAt(0) - offset + (encrypt ? keyShift : 26 - keyShift)) % 26) + offset
        );
        return shiftedChar;
      }
      return char;
    })
    .join('');
};

// XOR Cipher
export const xorCipher = (text: string, key: string, encrypt: boolean = true): string => {
  return text
    .split('')
    .map((char, index) => {
      const keyChar = key.charCodeAt(index % key.length);
      const result = char.charCodeAt(0) ^ keyChar;
      return String.fromCharCode(result);
    })
    .join('');
};

// Base64 Encoding (Not a cipher, but useful for encoding/decoding)
export const base64Encode = (text: string): string => {
  return btoa(text);
};

export const base64Decode = (text: string): string => {
  return atob(text);
};

export const blowfish = (text: string, key: string, encrypt: boolean = true): string => {
  if (encrypt) {
    return CryptoJS.Blowfish.encrypt(text, key).toString();
  } else {
    return CryptoJS.Blowfish.decrypt(text, key).toString(CryptoJS.enc.Utf8);
  }
};

// TripleDES (using `crypto-js`)
export const tripleDES = (text: string, key: string, encrypt: boolean = true): string => {
  if (encrypt) {
    return CryptoJS.TripleDES.encrypt(text, key).toString();
  } else {
    return CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
  }
};

// AES (using `crypto-js`)
export const aes = (text: string, key: string, encrypt: boolean = true): string => {
  if (encrypt) {
    return CryptoJS.AES.encrypt(text, key).toString();
  } else {
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
  }
};