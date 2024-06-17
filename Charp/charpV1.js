let letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
let resultadoCesar = "";
let resultadoVigenere = "";
let resultadoSubstituicao = "";
let resultadoInversao = "";
let n;

n = Math.floor(Math.random() * 25) + 1;

let mensagem = "Berlim";
let key = "Alemanha"; // chave para a cifra de Vigenère
let substitutionKey; // chave para a substituição

console.log("Mensagem original: " + mensagem);

resultadoCesar = cifraCesar(mensagem, n);
resultadoVigenere = rotorUm(resultadoCesar, key);
resultadoSubstituicao = rotorDois(resultadoVigenere);
resultadoInversao = rotorTres(resultadoSubstituicao);

let binario = toBin(resultadoInversao);
const binBackup = toBin(resultadoInversao);
const modificado = rotorQuatro(binario);
const invertido = rotorCinco(modificado);
console.log("Bits originais: " + binario);

decriptar(n, key, binBackup, substitutionKey);

function cifraCesar(mensagem, n) {
    let resultado = "";
    let shift = (char, n, alfabeto) => {
        let index = alfabeto.indexOf(char);
        if (index === -1) return char;
        let newIndex = (index + n) % alfabeto.length;
        if (newIndex < 0) newIndex += alfabeto.length;
        return alfabeto[newIndex];
    };

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];
        if (letrasMaiusculas.includes(char)) {
            resultado += shift(char, n, letrasMaiusculas);
        } else if (letrasMinusculas.includes(char)) {
            resultado += shift(char, n, letrasMinusculas);
        } else {
            resultado += char;
        }
    }
    console.log("Cifra de César: " + resultado);
    return resultado;
}

function rotorUm(mensagem, key) {
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];
        if (alphabetUpper.includes(char)) {
            let plainIndex = alphabetUpper.indexOf(char);
            let keyChar = key[keyIndex % key.length];
            let keyIndexVal = alphabetUpper.indexOf(keyChar);
            let encryptedChar = alphabetUpper[(plainIndex + keyIndexVal) % alphabetUpper.length];
            resultado += encryptedChar;
            keyIndex++;
        } else if (alphabetLower.includes(char)) {
            let plainIndex = alphabetLower.indexOf(char);
            let keyChar = key[keyIndex % key.length];
            let keyIndexVal = alphabetUpper.indexOf(keyChar);
            let encryptedChar = alphabetLower[(plainIndex + keyIndexVal) % alphabetLower.length];
            resultado += encryptedChar;
            keyIndex++;
        } else {
            resultado += char;
        }
    }

    console.log("Cifra de Vigenère (Rotor 1): " + resultado);
    return resultado;
}

function rotorDois(mensagem) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    substitutionKey = alphabet.split('').sort(() => Math.random() - 0.5).join('');
    let encryptMap = {};
    let decryptMap = {};

    for (let i = 0; i < alphabet.length; i++) {
        encryptMap[alphabet[i]] = substitutionKey[i];
        decryptMap[substitutionKey[i]] = alphabet[i];
    }

    let resultado = mensagem.split('').map(char => {
        let upperChar = char.toUpperCase();
        if (encryptMap[upperChar]) {
            return char === upperChar ? encryptMap[upperChar] : encryptMap[upperChar].toLowerCase();
        }
        return char;
    }).join('');

    console.log("Cifra de Substituição (Rotor 2): " + resultado);

    return resultado;
}

function rotorTres(resultado) {
    let reverse = resultado.split('').reverse().join('');
    console.log("Inversao: (rotor 3): " + reverse)
    return reverse;
}

function toBin(str) {
    let bin = str.split('')
        .map(function (caractere) {
            let binary = '';
            let code = caractere.charCodeAt(0);
            for (let i = 7; i >= 0; i--) {
                binary += (code & (1 << i)) ? '1' : '0';
            }
            return binary;
        })
        .join(' ');

    return bin;
}


function toString(binario) {
    return binario.split(' ')
        .map(function (bits) {
            return String.fromCharCode(parseInt(bits, 2));
        })
        .join('');
}

function rotorQuatro(binario) {
    let shifted = binario.split(' ')
        .map(byte => {
            let shiftedByte = (parseInt(byte, 2) >> 1).toString(2).padStart(8, '0');
            return shiftedByte;
        })
        .join(' ');
    console.log("Binário movido: (Rotor 4)" + shifted);
    return shifted;
}

function rotorCinco(binario) {
    let bits = binario.split(' ')
        .map(byte => byte.split('').map(bit => bit === '0' ? '1' : '0').join(''))
        .join(' ');
    console.log("Bit invertido: " + bits);
    console.log("Display final: " + bits);
    return bits;
}

function rotorUmDecrypt(mensagem, key) {
    const alphabetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabetLower = 'abcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    key = key.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];
        if (alphabetUpper.includes(char)) {
            let cipherIndex = alphabetUpper.indexOf(char);
            let keyChar = key[keyIndex % key.length];
            let keyIndexVal = alphabetUpper.indexOf(keyChar);
            let decryptedChar = alphabetUpper[(cipherIndex - keyIndexVal + alphabetUpper.length) % alphabetUpper.length];
            resultado += decryptedChar;
            keyIndex++;
        } else if (alphabetLower.includes(char)) {
            let cipherIndex = alphabetLower.indexOf(char);
            let keyChar = key[keyIndex % key.length];
            let keyIndexVal = alphabetUpper.indexOf(keyChar); // Usa índice maiúsculo para consistência
            let decryptedChar = alphabetLower[(cipherIndex - keyIndexVal + alphabetLower.length) % alphabetLower.length];
            resultado += decryptedChar;
            keyIndex++;
        } else {
            resultado += char;
        }
    }

    return resultado;
}

function rotorDoisDecrypt(mensagem, key) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encryptMap = {};
    let decryptMap = {};

    for (let i = 0; i < alphabet.length; i++) {
        encryptMap[alphabet[i]] = key[i];
        decryptMap[key[i]] = alphabet[i];
    }

    let resultado = mensagem.split('').map(char => {
        let upperChar = char.toUpperCase();
        if (decryptMap[upperChar]) {
            return char === upperChar ? decryptMap[upperChar] : decryptMap[upperChar].toLowerCase();
        }
        return char;
    }).join('');

    console.log("Descriptografia de Substituição (Rotor 2): " + resultado);
    return resultado;
}

function cifraCesarDecrypt(mensagem, n) {
    let resultado = "";
    let shift = (char, n, alfabeto) => {
        let index = alfabeto.indexOf(char);
        if (index === -1) return char;
        let newIndex = (index - n + alfabeto.length) % alfabeto.length;
        return alfabeto[newIndex];
    };

    for (let i = 0; i < mensagem.length; i++) {
        let char = mensagem[i];
        if (letrasMaiusculas.includes(char)) {
            resultado += shift(char, n, letrasMaiusculas);
        } else if (letrasMinusculas.includes(char)) {
            resultado += shift(char, n, letrasMinusculas);
        } else {
            resultado += char;
        }
    }
    console.log("Decriptado César: " + resultado);
    return resultado;
}

function decriptar(n, key, binBackup, substitutionKey) {

    console.log("O último binário é : " + binBackup)

    let mensagemBinaria = toString(binBackup).split('').reverse().join('');

    console.log("Mensagem binária: " + mensagemBinaria);

    let decriptadoSubstituicao = rotorDoisDecrypt(mensagemBinaria, substitutionKey);
    console.log("Decriptado Substituição: " + decriptadoSubstituicao);

    let decriptadoVigenere = rotorUmDecrypt(decriptadoSubstituicao, key);
    console.log("Decriptado Vigenère: " + decriptadoVigenere);

    let decriptado = cifraCesarDecrypt(decriptadoVigenere, n);
    console.log("Mensagem decriptada: " + decriptado);
}
