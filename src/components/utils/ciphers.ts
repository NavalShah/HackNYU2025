// ciphers.ts

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
  return Buffer.from(text).toString('base64');
};

export const base64Decode = (text: string): string => {
  return Buffer.from(text, 'base64').toString('utf-8');
};

// ciphers.ts

// Morse Code
// const MORSE_CODE_MAP: { [key: string]: string } = {
//   A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
//   I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
//   Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
//   Y: '-.--', Z: '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
//   '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
//   ' ': '/'
// };

// const REVERSE_MORSE_CODE_MAP: { [key: string]: string } = Object.fromEntries(
//   Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key])
// );

// export const morseCode = (text: string, encrypt: boolean = true): string => {
//   if (encrypt) {
//     return text
//       .toUpperCase()
//       .split('')
//       .map((char) => MORSE_CODE_MAP[char] || char)
//       .join(' ');
//   } else {
//     return text
//       .split(' ')
//       .map((code) => REVERSE_MORSE_CODE_MAP[code] || code)
//       .join('');
//   }
// };

// Blowfish (using a library like `crypto-js`)
import CryptoJS from 'crypto-js';

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