<?php
session_start();
require $_SERVER['DOCUMENT_ROOT'] . '/Galeria5-AJAX/database/database.php';
header('Content-Type: application/json');
$response = [];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['albumIDs'])) {
    $albumIDs = $_POST['albumIDs'];

    try {
        $database = new Database();
        $conn = $database->getConnection();

        // Crear la consulta con parámetros posicionales
        $placeholders = implode(',', array_fill(0, count($albumIDs), '?'));
        $query = "UPDATE albumes SET es_publico = CASE WHEN es_publico = 1 THEN 0 ELSE 1 END WHERE id_album IN ($placeholders)";
        $stmt = $conn->prepare($query);

        // Ejecutar la consulta con los parámetros
        if ($stmt->execute($albumIDs)) {
            $response['success'] = true;
            $response['message'] = 'Estado de los álbumes invertido correctamente.';
        } else {
            $response['success'] = false;
            $response['error'] = 'Error al actualizar el estado de los álbumes.';
        }
    } catch (PDOException $e) {
        $response['success'] = false;
        $response['error'] = 'Error de conexión a la base de datos: ' . $e->getMessage();
    }
} else {
    $response['success'] = false;
    $response['error'] = 'Solicitud no válida. Asegúrate de enviar los datos correctos.';
}

echo json_encode($response);
?>
