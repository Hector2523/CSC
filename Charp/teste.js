var bits = "10000101 10001010 10011101 10011011 10010101 10100110 10000101 10001010 10011101 10011011 10010101 10100110";
var bytes = bits.split(' ');
var separados = [];

// Separar os bytes em grupos de 6
for (let i = 0; i < bytes.length; i += 6) {
    separados.push(bytes.slice(i, i + 6));
}

// Remover duplicados
for (let i = 1; i < separados.length; i++) {
    if (JSON.stringify(separados[0]) === JSON.stringify(separados[i])) {
        separados.splice(i, 1);
        i--; // Ajustar o índice após a remoção
    }
}

// Transformar os arrays não repetidos em uma string novamente
var resultado = separados.map(grupo => grupo.join(' ')).join(' ');

console.log(resultado);
