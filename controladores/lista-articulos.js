import {seleccionarProductos} from "../modelos/productos.js";

// Elementos del DOM
const listado = document.querySelector("#listado");

// Variables
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
            <img src="./imagenes/productos/${articulo.imagen}" class="card-img-top" alt="${articulo.nombre}" />
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
            </div>
          </div>
        </div>        
        `
    })
}