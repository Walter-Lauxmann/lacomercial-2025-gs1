<?php
// Requerimos el archivo modelos.php
require_once 'modelos.php';

// Si hay un parámetro tabla
if(isset($_GET['tabla'])) {
    $tabla = new Modelo($_GET['tabla']); // Creamos el objeto $tabla
    if(isset($_GET['id'])) { // Si está seteado el id
        $tabla->setCriterio("id=" . $_GET['id']); // Establecemos el criterio
    }

    if(isset($_GET['accion'])) { // Si está seteada la acción
        switch ($_GET['accion']) { // Según la acción
            case 'seleccionar':
                $datos = $tabla->seleccionar(); // Ejecutamos el método seleccionar
                print_r($datos) ; // Mostramos los datos
                break;

            case 'insertar':
                $valores = $_POST;
                // Ejecutamos el método insertar y capturamos el ID
                $id = $tabla->insertar($valores);
    
                // Verificamos si se obtuvo un ID válido
                if ($id > 0) {
                    $respuesta = [
                        'success' => true,
                        'message' => 'Registro insertado correctamente.',
                        'id' => $id 
                    ];
                } else {
                    // En caso de que falle la inserción
                    $respuesta = [
                        'success' => false,
                        'message' => 'Error al insertar el registro.'
                    ];
                }
                
                // Siempre enviamos la respuesta JSON al final
                echo json_encode($respuesta);
                break;

            case 'actualizar':
                $valores = $_POST;
                $tabla->actualizar($valores); // Ejecutamos el método actualizar
                $respuesta = [
                    'success' => true,
                    'message' => 'Registro actualizado correctamente.'
                ];
                echo json_encode($respuesta);
                break;

            case 'eliminar':
                $tabla->eliminar(); // Ejecutamos el método eliminar)
                $respuesta = [
                    'success' => true,
                    'message' => 'Registro eliminado correctamente.'
                ];
                echo json_encode($respuesta);
                break;
        }
    }
    
}
?>