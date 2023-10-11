<?php
session_start();
require "./database/database.php"; // Asegúrate de incluir tu archivo de conexión a la base de datos

$response = []; // Inicializar una respuesta vacía

if (isset($_POST['new-description']) && isset($_POST['id_imagen']) && isset($_POST['pagina_actual'])) {
    $newDescription = $_POST['new-description'];
    $imageId = $_POST['id_imagen'];

    try {
        // Actualiza la descripción en la base de datos utilizando PDO
        $updateQuery = "UPDATE imagenes_sueltas SET descripcion = :newDescription WHERE id_imagen = :imageId";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bindParam(':newDescription', $newDescription, PDO::PARAM_STR);
        $stmt->bindParam(':imageId', $imageId, PDO::PARAM_INT);
        $stmt->execute();

        // Después de actualizar la descripción en la base de datos

        $response['status'] = "success";
        $response['message'] = "Descripción actualizada con éxito.";
        $response['newDescription'] = $newDescription; // Agrega la nueva descripción al JSON
    } catch (PDOException $e) {
        $response['status'] = "error";
        $response['message'] = "Error al actualizar la descripción: " . $e->getMessage();
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Falta información para editar la descripción.";
}


header("Content-Type: application/json");
echo json_encode($response);

