    <?php
    session_start();


    require $_SERVER['DOCUMENT_ROOT'] . '/Galeria5-AJAX/database/database.php';

    try {
        $database = new Database();
        $conn = $database->getConnection();

        // Obtener el AlbumID del parámetro de la solicitud
        $albumID = $_POST['albumID']; // Asegúrate de validar y sanitizar este valor para evitar inyecciones SQL

        $sql = "SELECT 
                    a.id_album, 
                    a.descripcion AS album_descripcion, 
                    a.imagen AS album_miniatura, 
                    a.fecha_creacion, -- Agregar la columna fecha_creacion aquí
                    i.id_img_alb, 
                    i.descripcion AS imagen_descripcion, 
                    i.imagen, 
                    i.id_album AS imagen_id_album
                FROM 
                    albumes a
                LEFT JOIN 
                    imagenes_albumes i ON a.id_album = i.id_album
                WHERE 
                    a.id_album = :albumID
                ORDER BY 
                    a.id_album, 
                    i.id_img_alb";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':albumID', $albumID, PDO::PARAM_INT);
        $stmt->execute();

        $datos = array();

        while ($row = $stmt->fetch()) {
            // Almacenar los datos del álbum
            $datos["id_album"] = $row["id_album"];
            $datos["descripcion"] = $row["album_descripcion"];
            $datos["miniatura"] = $row["album_miniatura"];
            $datos["fecha_creacion"] = $row["fecha_creacion"]; // Agregar la fecha de creación aquí

            // Almacenar los datos de las imágenes
            $datos["imagenes"][] = array(
                "id_img_alb" => $row["id_img_alb"],
                "descripcion" => $row["imagen_descripcion"],
                "imagen" => $row["imagen"],
                "id_album" => $row["imagen_id_album"]
            );
        }

        echo json_encode($datos);
    } catch (PDOException $e) {
        echo json_encode(array("error" => "Error en la conexión a la base de datos: " . $e->getMessage()));
    }

