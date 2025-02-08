function toBase64(encryptingText) {
    return btoa(encryptingText); // Base 64 converts binary data into readable ascii characters. Our writing system is in Base10, meaning we use the 10 characters. Base 64 is the 64 character alternative to that.
}
function fromBase64(decryptingText) {
    return atob(decryptingText);
}
function ceaserShift(textCrypt, shift) {
    var temp = "";
    for (var i = 0; i < textCrypt.length; i++) {
        var char = textCrypt[i];
        var charCodeDate = char.charCodeAt(0);
        if (char >= "A" && char <= "Z") {
            charCodeDate = ((charCodeDate - 65 + shift) % 26 + 26) % 26 + 65; // Wraps A-Z
        }
        else if (char >= "a" && char <= "z") {
            charCodeDate = ((charCodeDate - 97 + shift) % 26 + 26) % 26 + 97; // Wraps a-z
        }
        temp += String.fromCharCode(charCodeDate);
    }
    return temp;
}
console.log(ceaserShift("Hello, World!", 3));
