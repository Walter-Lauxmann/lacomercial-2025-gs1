<?php
// Requerimos el archivo modelos.php
require_once 'modelos.php';

// Si hay un parámetro tabla
if(isset($_GET['tabla'])) {
    $tabla = new Modelo($_GET['tabla']); // Creamos el objeto $tabla
    $datos = $tabla->seleccionar(); // Ejecutamos el método seleccionar
    print_r($datos) ; // Mostramos los datos
}
?>