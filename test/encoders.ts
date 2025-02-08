enum Strength {
    Weak,
    Strong
}

enum Speed {
    Slow,
    Fast
}


interface Encoder {
    encode: (input: string) => string,
    decode: (input: string) => string,
    strength: Strength,
    speed: Speed
}

class CaesarCipher implements Encoder {
    strength = Strength.Weak;
    speed = Speed.Fast;
    
    encode (input: string): string {
        return "";
    }

    decode (input: string): string {
        return "";
    }
}