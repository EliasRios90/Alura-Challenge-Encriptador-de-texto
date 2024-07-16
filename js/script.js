let textoNoEncriptado = document.getElementById('texto__no__encriptado');
let textoEncriptado = document.getElementById('texto__encriptado');

function encriptador(){
    
    if(validarEntrada()){
        let texto = '';

        desbloquearResultado();

        for(let i=0; i<textoNoEncriptado.value.length; i++){
            switch(textoNoEncriptado.value[i]){
                case 'a': texto += 'ai'; break;
                case 'e': texto += 'enter'; break;
                case 'i': texto += 'imes'; break;
                case 'o': texto += 'ober'; break;
                case 'u': texto += 'ufat'; break;
                default: texto += textoNoEncriptado.value[i]; break;
            }
        }

        textoEncriptado.value = texto;
        // para que el resultado tenga el suficiente espacio para mostrar el texto encriptado o desencriptado
        textoEncriptado.style.height = textoEncriptado.scrollHeight+'px';
        textoNoEncriptado.value = '';
    }
}

function desencriptador(){
    let texto = textoNoEncriptado.value;

    if(validarEntrada()){
        desbloquearResultado();

        texto = texto.replace(/ai/g, 'a');
        texto = texto.replace(/enter/g, 'e');
        texto = texto.replace(/imes/g, 'i');
        texto = texto.replace(/ober/g, 'o');
        texto = texto.replace(/ufat/g, 'u');

        textoEncriptado.value = texto;
        textoEncriptado.style.height = textoEncriptado.scrollHeight+'px';
        textoNoEncriptado.value = '';
    }
}

// función para copiar al portapapeles
function copiar(){
    textoEncriptado.select();
    textoEncriptado.setSelectionRange(0, 99999);// para dispositivos mobiles
    navigator.clipboard.writeText(textoEncriptado.value);
}

// para desbloquear el campo del resultado y mostrarlo
function desbloquearResultado(){
    document.getElementsByClassName('contenedor__resultado__imagen')[0].style.display = 'none';
    document.getElementById('mensaje').style.display = 'none';
    textoEncriptado.style.display = 'block';
    document.getElementById('btn__copiar').style.display = 'block';
}

// función para validar el texto del usuario. Hace una validación caracter a caracter
function validarEntrada(){
    let tamanio = textoNoEncriptado.value.length;
    let ultimoCaracter = textoNoEncriptado.value.charCodeAt(tamanio-1);
    let caracteres = [10, 32, 33, 44, 46, 63, 161, 191, 241];
    
    // 10='enter', 32=' ', 33='!', 44=',', 46='.', 63='?', 161='¡', 191='¿' y 241='ñ'
    // [92...122] si es una letra de la 'a' a la 'z' sin la letra 'ñ'
    if(caracteres.includes(ultimoCaracter) || (ultimoCaracter >= 92 && ultimoCaracter <= 122)){
        return true;
    }
    else{
        if(tamanio!=0){
            textoNoEncriptado.value = textoNoEncriptado.value.slice(0, -1); // borrando el ultimo caracter
            alert('Debe ingresar solamente palabras en minúsculas.\n\nNo debe ingresar palabras en mayúsculas, con acentos o caracteres especiales.');
        }
        return false;
    }
}
