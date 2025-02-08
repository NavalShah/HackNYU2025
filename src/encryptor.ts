function toBase64(encryptingText: string): string{
    return btoa(encryptingText);// Base 64 converts binary data into readable ascii characters. Our writing system is in Base10, meaning we use the 10 characters. Base 64 is the 64 character alternative to that.
}
function fromBase64(decryptingText: string): string{
    return atob(decryptingText); 
}
function ceaserShift(textCrypt: string, shift: number): string{
    let temp = "";
    for(let i = 0; i<textCrypt.length; i++){
        let char = textCrypt[i];
        let charCodeDate = char.charCodeAt(0);
	
	if (char >= "A" && char <= "Z") {
		charCodeDate = ((charCodeDate- 65 + shift) % 26 + 26) % 26 + 65; // Wraps A-Z
	} else if (char >= "a" && char <= "z") {
		charCodeDate = ((charCodeDate - 97 + shift) % 26 + 26) % 26 + 97; // Wraps a-z
        }
        temp += String.fromCharCode(charCodeDate);

    }
   
    return temp;
}
