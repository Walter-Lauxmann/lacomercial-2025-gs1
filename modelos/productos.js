// URL para acceder a la API
const URL = './api/datos.php?tabla=productos';

/**
 * Selecciona los productos de la BD
 */
export async function seleccionarProductos() {
    let res = await fetch(`${URL}&accion=seleccionar`);
    let datos = await res.json();
    if (res.status !== 200) {
        throw Error('Los datos no se encontraron');
    }
    return datos;
}

/**
 * Inserta los datos en la BD
 * @param datos los datos a insertar
 */
export function insertarProductos(datos) {
    fetch(`${URL}&accion=insertar`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

/**
 * Actualiza los datos en la Base de Datos
 * @param datos los datos a actualizar
 * @param id el id del artículo
 */
export const actualizarProductos = (datos, id) => {
    fetch(`${URL}&accion=actualizar&id=${id}`, {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

/**
 * Elimina los datos en la Base de Datos
 * @param id el id del artículo
 */
export const eliminarProductos = (id) => {
    fetch(`${URL}&accion=eliminar&id=${id}`, {})
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

