    //Event Listener que controla el click para cerrar el dialog 
    const dialog = document.querySelector('dialog');
    const wrapper = document.querySelector('.wrapper');

    dialog.addEventListener("click", (e) => !wrapper.contains(e.target) && dialog.close());

    console.log("Corriendo prueba.");

    //Función para mostrar el dialog
    function showDialog(show) {
        const dialog = document.querySelector('dialog');
        show ? dialog.showModal() : dialog.close(), limpiar();
        }
        
    const CargadeImagenes = () => {
        // Crear el div de my_nanogallery2 con los atributos data necesarios
        let galleryDiv = $('<div id="my_nanogallery2" data-nanogallery2=\'{}\'></div>');
        let galeriaContainer = document.getElementById('galeriaContainer');
        // Agregar el div al cuerpo del documento
        $(galeriaContainer).append(galleryDiv);

        // Realizar petición AJAX para obtener los datos de los álbumes e imágenes
        $.ajax({
            url: 'datosImagenes.php',
            dataType: 'json',
            success: function(data) {
                // Convertir el objeto en un array
                var dataArray = Object.values(data);

                // Toda la fé puesta.
                dataArray.reverse();

                let items = [];

                console.log(dataArray)

                // Iterar sobre los datos y construir los objetos de la galería
                $.each(dataArray, function(index, album) {
                    // Añadir el álbum
                    items.push({
                        src: "fotos/" + album.miniatura,
                        srct: "fotos/" + album.miniatura,
                        title: album.descripcion,
                        ID: album.id_album,
                        kind: 'album',
                        customData: {
                            date: album.fecha_creacion,
                            AlbumID: album.id_album,
                        }
                    });

                    // Añadir las imágenes del álbum
                    $.each(album.imagenes, function(index, imagen) {
                        items.push({
                            src: "fotos/" + imagen.imagen,
                            albumID: album.id_album
                        });
                    });

                });

            // Inicializar la galería nanogallery2 con los items obtenidos
            $("#my_nanogallery2").nanogallery2({
                items: items,
                thumbnailWidth: 300,
                thumbnailHeight: 300,
                thumbnailAlignment: 'center',
                thumbnailGutterWidth: 70,
                thumbnailGutterHeight: 50,
                galleryMaxRows: 3,
                galleryDisplayMode: 'pagination',
                galleryPaginationMode: 'numbers',
                locationHash: false,
                //Custom1: Borrar Album, Custom2: Cambiar el título del Album, custom3: Descargar Album
                thumbnailToolbarAlbum: { topLeft: 'custom1, custom2, custom3' }, 
                thumbnailToolbarImage: { topLeft: 'download' }, //Herramienta de descarga dentro de las imágenes
                icons: {
                    thumbnailCustomTool1: '<i class="bi bi-trash" style="color: white"></i>', //Borrar Album
                    thumbnailCustomTool2: '<i class="bi bi-pencil-square"></i>', //Cambiar el título del Album
                    thumbnailCustomTool3: '<i class="bi bi-download" style="color: white ;"></i>' //Descargar Album
                },
                fnThumbnailToolCustAction: myTnTool // Cambiar la función que maneja las acciones personalizadas
            });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error al obtener los datos de los álbumes:', textStatus, errorThrown);
            }
        }); 
    }

    // Función para manejar acciones personalizadas en la herramienta de miniaturas
    function myTnTool(action, item) {
        console.dir(item);

        switch (action) {
            case 'custom1':
                BorrarAlbum(item);
                break;
            case 'custom2':
                EditarDescripcionAlbum(item);
                break;
            case 'custom3':
                descargarAlbum(item); 
                break;
        }
    }

    //Función para crear el álbum
    const crearAlbum = () => {
        let descripcion = $('#imagenInput').val(); 
        let imagenes = $('#imagenInputDialogAlbum').prop('files'); 
        
        // Validar si el formulario está vacío
        if(descripcion.trim() === '' && imagenes.length === 0) {
            alert("Por favor, ingresa al menos una descripción o selecciona al menos una imagen.");
            return; 
        }

        // Crear un objeto FormData para enviar los datos al servidor
        let formData = new FormData();
        formData.append('description', descripcion); 

        let imagenesExcedidas = false; // Bandera para verificar si se superó el límite de imágenes

        // Agregar cada archivo al objeto FormData
        for (let i = 0; i < imagenes.length; i++) {
            if(imagenes.length <= 50){
                formData.append('files[]', imagenes[i]);
            } else {
                imagenesExcedidas = true;
                break; 
            }
        }

        // Verificar si se superó el límite de imágenes
        if(imagenesExcedidas) {
            alert("No se pueden subir más de 50 imágenes");
            return;
        }

        // Si no hay errores, enviar la solicitud AJAX
        $.ajax({
            url: 'upload.php', 
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log("respuesta exitosa:", response);
                console.log(formData)
                if(response.success) {
                $(galeriaContainer).empty();
                CargadeImagenes();
                limpiar();
                alert(response.success); 
                } else {
                    alert(response.error); 
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                console.log(formData);
                alert("Error en la solicitud AJAX. Consulta la consola para más detalles.");
            }
        });
    }

    const limpiar = () => {
        $('#imagenInput').val('');  // Borrar el valor del input de descripción
        $('#imagenInputDialogAlbum').val('');  // Borrar el valor del input de imágenes
    }
        

    //Función para Buscar Imágenes dentro de los álbumes
    function BuscarImg() {
        $("#search-form").on("submit", function(e) {
            e.preventDefault(); // Evita que el formulario se envíe de manera tradicional
        
            let searchTerm = $("#search-input").val();
        
            $.ajax({
                url: "buscarAlbum.php",
                method: "POST",
                data: { search: searchTerm },
                dataType: "json",
                success: function(data) {
                    if (data.error === 'no_images_found') {
                        alert('Ninguna imagen fue encontrada');
                    } else if (data.error === 'empty_search') {
                        alert('Ingresa algo en la consulta por favor');
                    } else {
                        // Limpiar la galería antes de agregar nuevos elementos
                        $("#my_nanogallery2").nanogallery2("destroy");
        
                        // Lógica para construir los items de la galería basados en los resultados de la búsqueda
                        let items = [];
        
                        // Iterar sobre los resultados de la búsqueda y construir los objetos de la galería
                        $.each(data, function(index, album) {
                            // Añadir el álbum
                            items.push({
                                src: "fotos/" + album.miniatura,
                                srct: "fotos/" + album.miniatura,
                                title: album.descripcion,
                                ID: album.id_album,
                                kind: 'album',
                                customData: {
                                    date: album.fecha_creacion // Asegúrate de que esta propiedad está asignada correctamente
                                }
                            });
        
                            // Añadir las imágenes del álbum
                            $.each(album.imagenes, function(index, imagen) {
                                items.push({
                                    src: "fotos/" + imagen.imagen,
                                    albumID: album.id_album
                                });
                            });
                        });
        
                        // Inicializar la galería nanogallery2 con los nuevos items
                        $("#my_nanogallery2").nanogallery2({
                            items: items,
                            thumbnailWidth: 300,
                            thumbnailHeight: 300,
                            thumbnailAlignment: 'center',
                            thumbnailGutterWidth: 70,
                            thumbnailGutterHeight: 50,
                            galleryMaxRows: 30,
                            galleryDisplayMode: 'pagination',
                            galleryPaginationMode: 'numbers',
                            locationHash: false
                        });
                    }
                },
        
                error: function(xhr, status, error) {
                    console.log('Error en la solicitud AJAX:');
                    console.log('Status:', status);
                    console.log('Error:', error);
                }
            });
        });        
    }
    
    function BorrarAlbum(item) {
        // Obtener el AlbumID del customData del objeto item
        var albumID = item.customData.AlbumID;
    
        // Crear un FormData para enviar el AlbumID al backend
        var formData = new FormData();
        formData.append('albumID', albumID);
    
        const confirmacion = confirm("¿Quieres eliminar este álbum?");

        if (confirmacion) {
        // Realizar la solicitud AJAX para eliminar el álbum
        $.ajax({
            url: 'eliminarAlbum.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
                success: function(response) {
                    console.log("respuesta exitosa:", response);
                    if (response.success === true) {
                        $(galeriaContainer).empty();
                        CargadeImagenes();
                        alert("Imagen agregada correctamente.");
                    } else if (response.success === false) {
                        alert(response.error);
                    } else {
                        alert("Error inesperado en la respuesta del servidor.");
                    }          
                    },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert("Error en la solicitud AJAX. Consulta la consola para más detalles.");
            }
            });
        }
    }
    
    async function descargarAlbum(item) {
        console.log("Item:", item);
    
        $.ajax({
            url: 'descargarAlbum.php',
            type: 'POST',
            data: { albumID: item.customData.AlbumID },
            dataType: 'json',
            success: async function(response) {
                console.log("Respuesta de obtener imágenes del álbum:", response);
    
                if (response.error) {
                    alert("Error al obtener las imágenes del álbum: " + response.error);
                    return;
                }
    
                const zip = new JSZip();
                const formData = new FormData();
    
                // Promesas para cargar todas las imágenes
                const imagePromises = response.imagenes.map(async function(imagen) {
                    // Separar las imágenes por comas
                    const imagenes = imagen.imagen.split(',');
    
                    // Iterar sobre cada imagen y agregarla al ZIP
                    await Promise.all(imagenes.map(async function(imagenNombre, index) {
                        const imageBlob = await fetch(`/Galeria5-AJAX/Albums/fotos/${imagenNombre}`).then(res => {
                            console.log(`Imagen cargada: ${imagenNombre}`);    
                            return res.blob();
                        });
    
                        // Agregar la imagen al archivo ZIP en el cliente
                        zip.file(imagenNombre, imageBlob);
                        console.log(`Imagen agregada al ZIP: ${imagenNombre}`);
    
                        // Agregar la descripción de la imagen al FormData
                        formData.append("image_descriptions[]", imagen.descripcion);
                        console.log(`Descripción de la imagen agregada al FormData: ${imagen.descripcion}`);
                    }));
                }); 
    
                // Esperar a que todas las promesas se resuelvan
                await Promise.all(imagePromises);
    
                // Generar el archivo ZIP en el cliente y descargarlo
                zip.generateAsync({ type: "blob" }).then(function(content) {
                    // Configurar el elemento de anclaje para descargar el archivo ZIP
                    const anchor = document.createElement("a");
                    const url = window.URL.createObjectURL(content);
                    anchor.href = url;
                    anchor.download = `Album_${item.title}.zip`;
                    console.log("Nombre de archivo descargado:", `album_${item.customData.AlbumID}.zip`);
    
                    // Simular el clic en el elemento de anclaje para iniciar la descarga
                    anchor.click();
    
                    // Liberar el objeto URL
                    window.URL.revokeObjectURL(url);
                });
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert("Error en la solicitud AJAX para obtener las imágenes del álbum. Consulta la consola para más detalles.");
            }
        });
    }
    
    const  EditarDescripcionAlbum = (item) => {
        // Obtener el ID del álbum del objeto item (suponiendo que item contiene el ID del álbum)
        let  albumID = item.customData.AlbumID;
        console.log(albumID);
    
        // Solicitar al usuario que ingrese la nueva descripción del álbum
        var nuevaDescripcion = prompt("Ingrese la nueva descripción del álbum:");
    
        if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== '') {
            // Crear un objeto FormData para enviar los datos al backend
            let formData = new FormData();
            formData.append('albumId', albumID);
            formData.append('newDescription', nuevaDescripcion);
    
            // Realizar la solicitud AJAX para actualizar la descripción del álbum
            $.ajax({
                url: 'editarDescripcion.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    console.log("Respuesta exitosa:", response);
                    if (response.success) {
                        alert("Descripción del álbum actualizada correctamente.");
                        $(galeriaContainer).empty();
                        CargadeImagenes();
                    } else if (response.error) {
                        alert("Error al actualizar la descripción del álbum: " + response.error);
                    } else {
                        alert("Error inesperado en la respuesta del servidor.");
                    }
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert("Error en la solicitud AJAX. Consulta la consola para más detalles.");
                }
            });
        } else {
            alert("La descripción no puede estar vacía.");
        }
    }
    
        
    BuscarImg();

    $(document).ready(function () {
        CargadeImagenes();
    });
    
    $('.cancelFooterDialogAlbum', '.spanHeader').on('click', function() {
        limpiar();
    });

    // Llamar a la función para crear un álbum cuando se hace clic en el botón "Subir Imagen"
    $('.saveFooterDialogAlbum').on('click', function() {
        crearAlbum();
    });