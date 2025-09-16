import {seleccionarProductos, insertarProductos, actualizarProductos, eliminarProductos} from "../modelos/productos.js";

// Elementos del DOM
const listado = document.querySelector("#listado");
const alerta = document.querySelector("#alerta");
const btnNuevo = document.querySelector("#btn-nuevo");

// Formulario
const formulario = document.querySelector('#formulario');
const formularioModal = new bootstrap.Modal(document.querySelector('#formularioModal'));

// Inputs
const inputCodigo = document.querySelector('#codigo');
const inputNombre = document.querySelector('#nombre');
const inputDescripcion = document.querySelector('#descripcion');
const inputPrecio = document.querySelector('#precio');
const inputImagen = document.querySelector('#imagen');

// Imagen del formulario
const frmImagen = document.querySelector('#frmImagen');

// Variables
let opcion = '';
let id;
let mensajeAlerta = '';
let articulos = [];
let articulo = {};

/**
 * Se ejecuta al cargar el documento
 */
document.addEventListener('DOMContentLoaded', () => {
    mostrarArticulos();
})

/**
 * Muestra la lista de articulos
 */
async function mostrarArticulos() {
  articulos = await seleccionarProductos();
    listado.innerHTML = '';

    articulos.map((articulo) => {
        listado.innerHTML += `
        
        <div class="col">
          <div class="card" style="width: 18rem">
            <img src="./imagenes/productos/${articulo.imagen||'nodisponible.png'}" class="card-img-top" alt="${articulo.nombre}" />
            <div class="card-body">
              <h5 class="card-title"><span name="spancodigo">${articulo.codigo}</span> - <span name="spannombre">${articulo.nombre}</span></h5>
              <p class="card-text">
                <img src="./imagenes/memory.svg"> |
                <img src="./imagenes/storage.svg"> | 
                <img src="./imagenes/photo_camera.svg"> |
                <img src="./imagenes/aod.svg"><br>
                ${articulo.descripcion}
              </p>
              <h5>$ <span name="spanprecio">${articulo.precio}</span>.-</h5>
              <input type="number" name="inputcantidad" class="form-control" value="0" min="0" max="30" onchange="calcular()" />          
            </div>
            <div class="card-footer d-flex justify-content-center">
                <button class="btn-editar btn btn-primary">Editar</button>
                <button class="btn-borrar btn btn-danger">Borrar</button>
                <input type="hidden" name="id" value="${articulo.id}" />
            </div>
          </div>
        </div>        
        `
    })
}

/**
 * Ejecuta el click del botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
  // Limpiamos los inputs
  inputCodigo.value = null;
  inputNombre.value = null;
  inputDescripcion.value = null;
  inputPrecio.value = null;
  inputImagen.value = null;
  // Colocamos la imagen nodisponible
  frmImagen.src = './imagenes/productos/nodisponible.png';

  // Mostramos el formulario
  formularioModal.show();

  opcion = 'insertar';
})

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene la acción por defecto

    const datos = new FormData(formulario); // Guarda los datos del formulario
    console.log(datos);
    switch (opcion) {
        case 'insertar':
            insertarProductos(datos);
            mensajeAlerta = '¡Datos guardados!';
            break;
        case 'actualizar':
            actualizarProductos(datos, id);
            mensajeAlerta = '¡Datos actualizados!';
            break;
        default:
            mensajeAlerta = '¡Error!';
    }
    insertarAlerta(mensajeAlerta, 'success');
    mostrarArticulos();
})

/**
 * Define el mensaje de alerta
 * @param mensaje el mensaje a mostrar
 * @param tipo el tipo de mensaje
 */
const insertarAlerta = (mensaje, tipo) => {
    const envoltorio = document.createElement('div');
    envoltorio.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible" role="alert">
            <div>${mensaje}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
    alerta.append(envoltorio);
}

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento
 * @param evento
 * @param selector
 * @param manejador
 */
const on = (elemento, evento, selector, manejador) => {
    elemento.addEventListener(evento, e => {
        if (e.target.closest(selector)) {
            manejador(e);
        }
      })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btn-editar', e => {
  const cardFooter = e.target.parentNode;
  id = cardFooter.querySelector('input[name="id"]').value;
  articulo = articulos.find(item => item.id === id);
  inputCodigo.value = articulo.codigo;
  inputNombre.value = articulo.nombre;
  inputDescripcion.value = articulo.descripcion;
  inputPrecio.value = articulo.precio;
  frmImagen.src = `./imagenes/productos/${articulo.imagen}`;
  opcion = 'actualizar';
  formularioModal.show();
})

/**
 * Función para el botón Borrar
 */
on(document, 'click', '.btn-borrar', e => {
  const cardFooter = e.target.parentNode;
  id = cardFooter.querySelector('input[name="id"]').value;
  articulo = articulos.find(item => item.id === id);
  let aceptar = confirm(`¿Realmente desea eliminar a ${articulo.nombre}?`);
  if (aceptar) {
    eliminarProductos(id);
    mensajeAlerta = '¡Datos eliminados!';
    insertarAlerta(mensajeAlerta, 'danger');
    mostrarArticulos();
  }  
})