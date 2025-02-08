export enum Type {
    String,
    Integer,

}

export type Setting = {
    name: string,
    type: Type,
    value: any
}

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
    speed: Speed,
    settings: Setting[]
}

export class CaesarCipher implements Encoder {
    settings = [{ name: "shift", type: Type.Integer, value: 0 }];
    strength = Strength.Weak;
    speed = Speed.Fast;

    get shift() {
        return this.settings[0];
    }

    encode (input: string): string {
        return "";
    }

    decode (input: string): string {
        return "";
    }
}


