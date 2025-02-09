import cryptoJS from "crypto-js";

// Morse Code Encoding and Decoding
export const MorseCode = new class {
    private morseCodeMap: { [key: string]: string } = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..',
        'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': '/'  // Space is represented as '/'
    };

    encode(plainText: string): string {
        return plainText.toUpperCase().split('').map(char => this.morseCodeMap[char] || '').join(' ');
    }

    decode(morseParser: string): string {
        const reversedMorseCodeMap = Object.fromEntries(Object.entries(this.morseCodeMap).map(([key, value]) => [value, key]));
        return morseParser.split(' ').map(code => reversedMorseCodeMap[code] || '').join('');
    }
};

// Blowfish Encryption and Decryption
export const Blowfish = new class {
    encrypt(plainText: string, key: string): string {
        return cryptoJS.Blowfish.encrypt(plainText, key).toString();
    }

    decrypt(encryptedText: string, key: string): string {
        const bytes = cryptoJS.Blowfish.decrypt(encryptedText, key);
        return bytes.toString(cryptoJS.enc.Utf8);
    }
};

// Triple DES Encryption and Decryption
export const TripleDES = new class {
    encrypt(plainText: string, key: string): string {
        const encrypted = cryptoJS.TripleDES.encrypt(plainText, cryptoJS.enc.Utf8.parse(key), {
            mode: cryptoJS.mode.ECB,
            padding: cryptoJS.pad.Pkcs7,
        });
        return encrypted.toString();
    }

    decrypt(encryptedText: string, key: string): string {
        const decrypted = cryptoJS.TripleDES.decrypt(encryptedText, cryptoJS.enc.Utf8.parse(key), {
            mode: cryptoJS.mode.ECB,
            padding: cryptoJS.pad.Pkcs7,
        });
        return decrypted.toString();
    }
};

// AES Encryption and Decryption
export const AES = new class {
    private secretKey: string = "my_secret_key_32bytes_long"; // Must be 32 bytes for AES-256

    encrypt(plainText: string): string {
        return cryptoJS.AES.encrypt(plainText, this.secretKey).toString();
    }

    decrypt(encryptedText: string): string {
        const bytes = cryptoJS.AES.decrypt(encryptedText, this.secretKey);
        return bytes.toString();
    }
};

// Base64 Encoding and Decoding
export const Base64 = new class {
    encode(encryptingText: string): string {
        return btoa(encryptingText);
    }

    decode(decryptingText: string): string {
        return atob(decryptingText);
    }
};

// Caesar Shift Encoding and Decoding
export const CaesarShift = new class {
    encode(textCrypt: string, shift: number): string {
        let temp = "";
        for (let i = 0; i < textCrypt.length; i++) {
            let char = textCrypt[i];
            let charCodeDate = char.charCodeAt(0);

            if (char >= "A" && char <= "Z") {
                charCodeDate = ((charCodeDate - 65 + shift) % 26 + 26) % 26 + 65; // Wraps A-Z
            } else if (char >= "a" && char <= "z") {
                charCodeDate = ((charCodeDate - 97 + shift) % 26 + 26) % 26 + 97; // Wraps a-z
            }
            temp += String.fromCharCode(charCodeDate);
        }
        return temp;
    }

    decode(textCrypt: string, shift: number): string {
        return this.encode(textCrypt, shift * -1);
    }
};

// Vigenère Cipher Encoding and Decoding
export const VigenereCipher = new class {
    encode(textCrypt: string, shift: string): string {
        let temp = "";
        for (let i = 0; i < textCrypt.length; i++) {
            let char = textCrypt[i];
            let charCodeDate = char.charCodeAt(0);

            let keyChar = shift[i % shift.length];
            let nextShiftingCode = 0;
            if (keyChar >= "A" && keyChar <= "Z") {
                nextShiftingCode = keyChar.charCodeAt(0) - 65; // Convert A-Z -> 0-25
            } else if (keyChar >= "a" && keyChar <= "z") {
                nextShiftingCode = keyChar.charCodeAt(0) - 97; // Convert a-z -> 0-25
            }
            if (char >= "A" && char <= "Z") {
                charCodeDate = ((charCodeDate - 65 + nextShiftingCode) % 26 + 26) % 26 + 65; // Wraps A-Z
            } else if (char >= "a" && char <= "z") {
                charCodeDate = ((charCodeDate - 97 + nextShiftingCode) % 26 + 26) % 26 + 97; // Wraps a-z
            }
            temp += String.fromCharCode(charCodeDate);
        }
        return temp;
    }

    decode(textCrypt: string, shift: string): string {
        let temp = "";
        for (let i = 0; i < textCrypt.length; i++) {
            let char = textCrypt[i];
            let charCodeDate = char.charCodeAt(0);

            let keyChar = shift[i % shift.length];
            let nextShiftingCode = 0;
            if (keyChar >= "A" && keyChar <= "Z") {
                nextShiftingCode = keyChar.charCodeAt(0) - 65; // Convert A-Z -> 0-25
            } else if (keyChar >= "a" && keyChar <= "z") {
                nextShiftingCode = keyChar.charCodeAt(0) - 97; // Convert a-z -> 0-25
            }
            if (char >= "A" && char <= "Z") {
                charCodeDate = ((charCodeDate - 65 - nextShiftingCode) % 26 + 26) % 26 + 65; // Wraps A-Z
            } else if (char >= "a" && char <= "z") {
                charCodeDate = ((charCodeDate - 97 - nextShiftingCode) % 26 + 26) % 26 + 97; // Wraps a-z
            }
            temp += String.fromCharCode(charCodeDate);
        }
        return temp;
    }
};