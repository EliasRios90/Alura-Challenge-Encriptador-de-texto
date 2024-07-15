let textoNoEncriptado = document.getElementById('texto__no__encriptado');
let mensaje = document.getElementById('mensaje');
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

function copiar(){
    textoEncriptado.select();
    textoEncriptado.setSelectionRange(0, 99999);// para dispositivos mobiles
    navigator.clipboard.writeText(textoEncriptado.value);
}



function desbloquearResultado(){
    document.getElementsByClassName('contenedor__resultado__imagen')[0].style.display = 'none';
    mensaje.style.display = 'none';
    textoEncriptado.style.display = 'block';
    document.getElementById('btn__copiar').style.display = 'block';
}

function validarEntrada(){
    let tamanio = textoNoEncriptado.value.length;
    let ultimoCaracter = textoNoEncriptado.value.charCodeAt(tamanio-1);
    
    if(ultimoCaracter == 10 || ultimoCaracter == 32 || ultimoCaracter == 241){// si ha presionado enter o es un espacio en blanco o la letra 'ñ'
        return true;
    }
    else if((ultimoCaracter >= 92 && ultimoCaracter <= 122)){// si es una letra de la 'a' a la 'z' menos la letra 'ñ'
        return true;
    }
    else{
        if(tamanio!=0){
            textoNoEncriptado.value = textoNoEncriptado.value.slice(0, -1); // borrando el ultimo caracter
            alert('Debe ingresar solamente palabras en minúsculas.\n\nNo debe ingresar palabras en mayúsculas o caracteres especiales.');
        }
        return false;
    }
}
