export enum Strength {
    Weak,
    Strong
}

export enum Speed {
    Slow,
    Fast
}

export interface Encoder {
    encode: (input: string) => string,
    decode: (input: string) => string,
    strength: Strength,
    speed: Speed
}

export class CaesarCipher implements Encoder {
    strength = Strength.Weak;
    speed = Speed.Fast;
    
    encode (input: string): string {
        return "";
    }

    decode (input: string): string {
        return "";
    }
}

