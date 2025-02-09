export const CIPHERS = [
    { 
        name: 'Caesar Cipher', 
        paragraph: "The Caesar Cipher is one of the oldest known encryption methods, used by Julius Caesar over 2,000 years ago to send secret messages to his generals. It works by shifting each letter in the alphabet forward or backward by a fixed number. Since there are only 25 possible shifts, it is easy to break using brute force or frequency analysis. Loss: The structure of the original text is preserved, making it vulnerable to frequency analysis. It also loses support for numbers, symbols, and non-alphabetic characters unless extended with additional rules." 
    },
    { 
        name: 'Vigenère Cipher', 
        paragraph: "The Vigenère Cipher, invented in the 16th century, is an improvement over the Caesar Cipher. It uses a keyword to determine multiple shifts in the text, making it harder to break. It was considered unbreakable for centuries, earning the nickname 'le chiffre indéchiffrable' (the indecipherable cipher). However, in the 19th century, it was cracked using statistical analysis. Loss: Similar to the Caesar Cipher, it retains letter patterns, making it vulnerable to frequency analysis. It also loses support for non-alphabetic characters unless explicitly modified to include them." 
    },
    { 
        name: 'XOR Cipher', 
        paragraph: "The XOR Cipher is a simple yet powerful encryption method used in modern computing. It operates by applying the XOR (exclusive OR) operation between each character of the plaintext and a key. If the key is truly random and as long as the message, the encryption is theoretically unbreakable (one-time pad). However, if the key is reused, it becomes vulnerable to attacks. Loss: The XOR operation can produce non-printable or special characters, making the encoded text unreadable in standard text formats. If the key is short or predictable, it also loses security, making it susceptible to pattern recognition." 
    },
    { 
        name: 'Base64 Encoding', 
        paragraph: "Base64 Encoding is not a cipher but a method of converting binary data into readable text using 64 different characters (A-Z, a-z, 0-9, +, /). It was developed in the 20th century for encoding data in email and web applications, allowing safe transmission of images, files, and other non-text data. Loss: Base64 increases the size of the original data by about 33% but does not lose any actual information. It only transforms the representation to make binary data safe for text-based systems. Advantage: By using Base64, data that would normally become unreadable or corrupted when transmitted through text-based protocols (such as email or URLs) remains intact, avoiding the problems caused by other ciphers that produce non-printable or special characters." 
    },
    { 
        name: 'Base64 Decoding', 
        paragraph: "Base64 Decoding reverses Base64 encoding, converting the text back into its original binary form. This method is widely used in computing for decoding images, encryption keys, and other encoded data stored in text format. Loss: No loss occurs in decoding, as it fully restores the original binary data." 
    }, 
    { 
        name: 'Blowfish', 
        paragraph: "Blowfish was created in 1993 by Bruce Schneier as a fast and secure encryption algorithm. It uses a variable-length key (from 32 to 448 bits) and encrypts data in 64-bit blocks. Though it was widely used for years due to its efficiency, it has been mostly replaced by AES due to security concerns in some implementations. Loss: Being a block cipher, Blowfish loses the exact length of the original plaintext unless padding is handled correctly. It also loses human readability, as encrypted data appears as random bytes." 
    }, 
    { 
        name: 'TripleDES', 
        paragraph: "TripleDES (3DES) was introduced in the late 1990s as an improvement to the aging DES algorithm, which was no longer secure due to advances in computing power. 3DES applies the DES encryption process three times with different keys, making it much harder to crack. However, it is slower than AES and is gradually being phased out. Loss: Like Blowfish, 3DES loses the original text length and readability. It also suffers from key size limitations, which make it less secure compared to modern encryption methods." 
    }, 
    { 
        name: 'AES', 
        paragraph: "AES (Advanced Encryption Standard) was established in 2001 as the successor to DES. Developed through an international competition, it was selected for its strong security and efficiency. AES encrypts data in fixed-size 128-bit blocks and supports key sizes of 128, 192, or 256 bits. It is now the global standard used by governments, banks, and tech companies for securing sensitive data. Loss: Like other modern encryption algorithms, AES loses plaintext patterns, human readability, and the original data format. However, this loss is necessary to ensure strong security." 
    }
    ];
    