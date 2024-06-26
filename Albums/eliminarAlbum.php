<?php
session_start();

header('Content-Type: application/json');

require $_SERVER['DOCUMENT_ROOT'] . '/Galeria5-AJAX/database/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();

    // Verificar si se envió un ID de álbum para eliminar
    if (isset($_POST['albumID'])) {
        $albumID = $_POST['albumID'];

        // Comenzar una transacción
        $conn->beginTransaction();

        try {
            // Obtener las imágenes asociadas al álbum
            $stmt = $conn->prepare("SELECT imagen FROM imagenes_albumes WHERE id_album = :albumID");
            $stmt->bindParam(':albumID', $albumID, PDO::PARAM_INT);
            $stmt->execute();
            $imagesString = $stmt->fetchColumn();

            // Dividir la cadena de imágenes en un array
            $images = explode(",", $imagesString);

            // Eliminar las imágenes asociadas al álbum del directorio
            foreach ($images as $image) {
                $imagePath = $_SERVER['DOCUMENT_ROOT'] . '/Galeria5-AJAX/Albums/fotos/' . trim($image);

                if (file_exists($imagePath)) {
                    if (unlink($imagePath)) {
                        // Debuggeo: Mostrar que la imagen fue eliminada
                        //echo json_encode(array("debug" => "Imagen eliminada correctamente: " . $imagePath));
                    } else {
                        // Debuggeo: Mostrar si hubo un error al eliminar la imagen
                        echo json_encode(array("debug" => "Error al eliminar la imagen: " . $imagePath));
                    }
                } else {
                    // Debuggeo: Mostrar si la imagen no existe en la ruta especificada
                    echo json_encode(array("debug" => "La imagen no existe en la ruta especificada: " . $imagePath));
                }
            }

            // Eliminar las imágenes asociadas al álbum de la base de datos
            $stmt = $conn->prepare("DELETE FROM imagenes_albumes WHERE id_album = :albumID");
            $stmt->bindParam(':albumID', $albumID, PDO::PARAM_INT);
            $stmt->execute();

            // Eliminar el álbum
            $stmt = $conn->prepare("DELETE FROM albumes WHERE id_album = :albumID");
            $stmt->bindParam(':albumID', $albumID, PDO::PARAM_INT);
            $stmt->execute();

            // Confirmar la transacción
            $conn->commit();

            echo json_encode(array("success" => true));
        } catch (PDOException $e) {
            // Revertir la transacción en caso de error
            $conn->rollBack();

            echo json_encode(array("error" => "Error al eliminar el álbum: " . $e->getMessage()));
        }
    } else {
        echo json_encode(array("error" => "No se proporcionó un ID de álbum para eliminar"));
    }
} catch (PDOException $e) {
    echo json_encode(array("error" => "Error en la conexión a la base de datos: " . $e->getMessage()));
}