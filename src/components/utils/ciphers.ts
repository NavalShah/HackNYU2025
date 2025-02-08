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
  
  // Add more ciphers here (e.g., AES, RSA, etc.)