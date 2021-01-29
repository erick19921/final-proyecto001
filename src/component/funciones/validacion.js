const formulario = document.getElementById('formulario');
const cedula = document.getElementById('cedula');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const nombre_usuario = document.getElementById('nombre_usuario');
const contrasenia = document.getElementById('contrasenia');
const ciudad_nacimiento = document.getElementById('ciudad_nacimiento');
const direccion = document.getElementById('direccion');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');


var error = document.getElementById('error');
error.style.color = 'red'
const expresiones = {
	nombre_usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    contrasenia: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{9,10}$/ // 9 a 10 numeros.
}

function validacion(){

    var mensajesError= [];

    if(cedula.value === null || cedula.value === ''){
        mensajesError.push('Ingresa la cédula')
    }
    if(nombre.value === null || nombre.value === ''){
        mensajesError.push('Ingresa el nombre')
    }
    if(apellido.value === null || apellido.value === ''){
        mensajesError.push('Ingresa el apellido')
    }
    if(nombre_usuario.value === null || nombre_usuario.value === ''){
        mensajesError.push('Ingresa el nombre de usuario')
    }
    if(contrasenia.value === null || contrasenia.value === ''){
        mensajesError.push('Ingresa la contraseña')
    }
    if(ciudad_nacimiento.value === null || ciudad_nacimiento.value === ''){
        mensajesError.push('Ingresa la ciudad de nacimiento')
    }
    if(direccion.value === null || direccion.value === ''){
        mensajesError.push('Ingresa la direccion')
    }
    if(telefono.value === null || telefono.value === ''){
        mensajesError.push('Ingresa el teléfono')
    }
    if(email.value === null || email.value === ''){
        mensajesError.push('Ingresa el email')
    }

    error.innerHTML = mensajesError.join(', ')
    
    return false
}
