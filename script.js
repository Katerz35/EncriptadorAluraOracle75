const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");


function removerTildesYCaracteresEspeciales(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .replace(/ñ/g, "n");
}

function validarEntrada(evento) {
    const tecla = evento.key;
    
    if (evento.ctrlKey || evento.altKey || evento.metaKey || tecla.length > 1) {
        return;
    }
    
    if (!/^[a-zA-Z\s]$/.test(tecla)) {
        evento.preventDefault();
    }
}

function procesarPegado(evento) {
    evento.preventDefault();
    const textoPegado = (evento.clipboardData || window.clipboardData).getData('text');
    const textoFiltrado = removerTildesYCaracteresEspeciales(textoPegado.toLowerCase());
    document.execCommand('insertText', false, textoFiltrado);
}

textArea.addEventListener('keydown', validarEntrada);
textArea.addEventListener('paste', procesarPegado);
textArea.addEventListener('input', function() {
    this.value = removerTildesYCaracteresEspeciales(this.value.toLowerCase());
});


function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value)
    mensaje.value = textoEncriptado
    textArea.value = "";
    mensaje.style.backgroundImage = "none"
}


function encriptar(stringEncriptado) {
    const matizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringEncriptado = stringEncriptado.toLowerCase()

    for(let i = 0; i < matizCodigo.length; i++){
        if(stringEncriptado.includes(matizCodigo[i][0])){
            stringEncriptado = stringEncriptado.replaceAll(matizCodigo[i][0], matizCodigo[i][1])
        }
    }
    return stringEncriptado
}

function btnDesencriptar() {
    const textoEncriptado = desencriptar(textArea.value)
    mensaje.value = textoEncriptado
    textArea.value = "";
    mensaje.style.backgroundImage = "none"
}

function desencriptar(stringDesencriptado) {
    const matizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
    stringDesencriptado = stringDesencriptado.toLowerCase()

    for(let i = 0; i < matizCodigo.length; i++){
        if(stringDesencriptado.includes(matizCodigo[i][1])){
            stringDesencriptado = stringDesencriptado.replaceAll(matizCodigo[i][1], matizCodigo[i][0])
        }
    }
    return stringDesencriptado
}

document.querySelector(".btn-copiar").addEventListener("click", function() {
    const textoCopiado = mensaje.value;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        mensaje.value = "";
        alert("Texto copiado al portapapeles!");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});

// textArea.addEventListener('paste', (evento) => {
//     evento.preventDefault();
//     const textoPegado = (evento.clipboardData || window.clipboardData).getData('text');
//     const textoLimpio = removerTildes(textoPegado.toLowerCase()).replace(/[^a-z0-9\s]/g, '');
//     document.execCommand('insertText', false, textoLimpio);
// });