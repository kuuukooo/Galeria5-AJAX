$(document).ready(function() {
    console.log("Script de edición de Cargado de Imagenes cargado.");

    const generarListadoImagenes = (data) => {
        data.imagenes.forEach(function(imagen) {
            let colCardContainer = $('<div>');
            colCardContainer.addClass('col');
            colCardContainer.attr('id', 'col' + imagen.id_imagen);
    
            let cardElement = $('<div>');
            cardElement.addClass('card');
    
            let carouselElement = $('<div>');
            carouselElement.attr('id', 'carousel' + imagen.id_imagen);
            carouselElement.addClass('carousel slide');
            carouselElement.attr('data-bs-ride', 'carousel');
    
            let carouselInner = $('<div class="carousel-inner"></div>');
    
            $.each(imagen.imagenes, function(j, imageName) {
                let isActive = j === 0 ? 'active' : '';
                let carouselItem = $('<div>');
                carouselItem.addClass('carousel-item ' + isActive);
    
                let link = $('<a>');
                link.attr('href', '#');
                link.attr('data-bs-toggle', 'modal');
                link.attr('data-bs-target', '#modal' + imagen.id_imagen + '-' + j);
                
                let imageContainer = $('<div>');
                imageContainer.addClass('image-container selectable-image');
                imageContainer.attr('id', 'image-' + imagen.id_imagen + '-' + j);
                imageContainer.attr('data-description', imagen.descripcion[j]);
                imageContainer.css('background-image', 'url(\'./assets/images/posts/' + imageName + '\')');
    
                link.append(imageContainer);
                carouselItem.append(link);
                carouselInner.append(carouselItem);
    
                let modal = $('<div class="modal fade" id="modal' + imagen.id_imagen + '-' + j + '" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">');
                let modalDialog = $('<div class="modal-dialog modal-dialog-centered modal-lg">');
                let modalContent = $('<div class="modal-content">');
                let modalBody = $('<div class="modal-body">');
    
                let carouselElement = $('<div>');
                carouselElement.addClass('carousel slide');
                carouselElement.attr('id', 'carousel' + imagen.id_imagen + '-' + j);
                carouselElement.attr('data-bs-ride', 'carousel');
    
                let modalCarouselInner = $('<div>');
                modalCarouselInner.addClass('carousel-inner');
    
                $.each(imagen.imagenes, function(k, modalImageName) {
                    let modalIsActive = k === j ? 'active' : '';
                    let modalCarouselItem = $('<div>');
                    modalCarouselItem.addClass('carousel-item ' + modalIsActive);
    
                    let modalImageElement = $('<img>');
                    modalImageElement.attr('src', './assets/images/posts/' + modalImageName);
                    modalImageElement.addClass('d-block w-100');
    
                    modalCarouselItem.append(modalImageElement);
                    modalCarouselInner.append(modalCarouselItem);
                });
    
                carouselElement.append(modalCarouselInner);
    
                let prevButton = $('<button class="carousel-control-prev" data-bs-target="#carousel' + imagen.id_imagen + '-' + j + '" data-bs-slide="prev">');
                prevButton.html('<span class="carousel-control-prev-icon" aria-hidden="true"></span>');
                let nextButton = $('<button class="carousel-control-next" data-bs-target="#carousel' + imagen.id_imagen + '-' + j + '" data-bs-slide="next">');
                nextButton.html('<span class="carousel-control-next-icon" aria-hidden="true"></span>');
    
                carouselElement.append(prevButton);
                carouselElement.append(nextButton);
                modalBody.append(carouselElement);
    
                modalBody.css('justify-content', 'center');
                modalBody.css('align-items', 'center');
    
                modalContent.append(modalBody);
                modalDialog.append(modalContent);
                modal.append(modalDialog);
                $('body').append(modal);
            });
    
            carouselElement.append(carouselInner);
            cardElement.append(carouselElement);
            colCardContainer.append(cardElement);
            $('#row').append(colCardContainer);
    
            let cardBodyElement = $('<div>').addClass('card-body');
            cardBodyElement.attr('id', 'card-body-' + imagen.id_imagen);
            cardBodyElement.append('<div class="original-description" id="DescriptionID-' + imagen.id_imagen + '">' + imagen.descripcion + '</div>');
    
            let botonesUtilidadesContainer = $('<div>').addClass('botones-utilidades');
            let iconClass = imagen.es_publico ? 'bi bi-eye' : 'bi bi-eye-slash';
            let checkbox =  $('<input>').attr('type', 'checkbox').addClass('image-checkbox checkboxHerramienta').attr('data-image-id', imagen.id_imagen).attr('data-description', imagen.descripcion);

            botonesUtilidadesContainer.append(checkbox)
            botonesUtilidadesContainer.append('<button class="btn-publicar" data-image-id="' + imagen.id_imagen + '"><i class="' + iconClass + '"></i></button>');
            botonesUtilidadesContainer.append('<button class="delete-button" data-image-id="' + imagen.id_imagen + '"><i class="bi bi-trash3 fa-6x"></i></button>');
            botonesUtilidadesContainer.append('<button class="btn-edit-description" data-image-id="' + imagen.id_imagen +'"><i class="bi bi-pencil-square"></i></button>');
            botonesUtilidadesContainer.append('<a class="download-button" href="#" data-images="' + imagen.imagenes.join(',') + '" data-description="' + imagen.descripcion + '" data-descriptions="' + imagen.descripcion + '"><i class="bi bi-download"></i></a>');

            cardBodyElement.append(botonesUtilidadesContainer); 
    
    
            carouselElement.append(carouselInner);
            cardElement.append(carouselElement, cardBodyElement);
            colCardContainer.append(cardElement);
    
            let descriptionEditContainer = $("<div>").addClass("description-edit-container").attr("id", "description-edit-" + imagen.id_imagen).css("display", "none");
            let formElement = $("<form>").attr("action", "editar-descripcion.php").attr("method", "POST").attr("id", "edit-form-" + imagen.id_imagen);
            let textareaElement = $("<textarea>").attr("maxlength", "25").attr("name", "new-description").addClass("form-control").text(imagen.descripcion);
            let hiddenInputId = $("<input>").attr("type", "hidden").attr("name", "id_imagen").val(imagen.id_imagen);
            let hiddenInputEditDescription = $("<input>").attr("type", "hidden").attr("name", "edit-description").val(imagen.descripcion || ''); 
            let hiddenInputPaginaActual = $("<input>").attr("type", "hidden").attr("name", "pagina_actual").val(imagen.pagina_actual); 
    
            let saveButton = $("<button>").attr("type", "submit").addClass("btn btn-primary ColorAzul").attr("id","guardar-btn").text("Guardar");
            let cancelButton = $("<a>").attr("href", "#").addClass("btn btn-secondary cancel-edit").attr("data-image-id", imagen.id_imagen).text("Cancelar"); 
    
            formElement.append(textareaElement, hiddenInputId, hiddenInputEditDescription, hiddenInputPaginaActual, saveButton, cancelButton);
            descriptionEditContainer.append(formElement);
            colCardContainer.find('.card-body').append(descriptionEditContainer);
    
            $('#image-container').append(colCardContainer);
        });
    
        downloadimage();
        BotonEliminar();
        console.log("Botón de eliminar correctamente activado");
        ModoOscuro();
  
    };
    
    $(document).ready(function() {
        // Crear el contenedor de botones de acción una vez al cargar la página
        let actionButton = document.getElementsByClassName("EliminarVarios")[0];

        let $actionButton = $(actionButton);
        
        $actionButton.on('click', function() {
            let selectedImages = $('.image-checkbox:checked').map(function() {
                return $(this).data('image-id');
            }).get();
    
            if (selectedImages.length === 0) {
                alert('No has seleccionado ninguna imagen.');
                return;
            } 
    
            console.log('Imágenes seleccionadas:', selectedImages);
    
            // Enviar los IDs seleccionados al servidor para eliminar los álbumes
            $.ajax({
                url: 'ImagenesSueltas/Eliminar.php',
                type: 'POST',
                data: { selectedImages: selectedImages },
                success: function(response) {
                    alert("Imágenes eliminadas exitosamente.");
                    
                    cargarImagenesYActivarEdicion(1);
                },
                error: function(xhr, status, error) {
                    console.error('Error al eliminar los álbumes:', error);
                    alert('Hubo un error al intentar eliminar los álbumes.');
                }
            });
        });        
    });
    
    // Función para cargar las imágenes y luego activar la edición
    function cargarImagenesYActivarEdicion(pagina) {
        let container = $("#image-container"); // El contenedor de imágenes
        container.empty(); // Vacía el contenedor antes de cargar nuevas imágenes
    
        $.ajax({
            type: "GET",
            url: "ImagenesSueltas/cargar_imagenes.php?pagina=" + pagina,
            dataType: "json",
            success: function (data) {
                container.empty();
                generarBotonesPaginacion(data.totalPaginas, pagina);
                generarListadoImagenes(data);
            },
            error: function(error) {
                console.error("Error en la solicitud AJAX:", error);
                // Manejar errores de la solicitud AJAX aquí
            }
        });
    }    
    
    
    //Paginación
    const generarBotonesPaginacion = (totalPaginas, paginaActual) => {
        let paginationContainer = $("#pagination-container");
        let paginationList = paginationContainer.find("ul.pagination");
        paginationList.empty();
    
        let prevButton = $("<li class='page-item'><a class='page-link' href='#'><</a></li>");
        prevButton.click(function (event) {
            event.preventDefault();
            if (paginaActual > 1) {
                cargarImagenesYActivarEdicion(paginaActual - 1);
            }
        });
    
        let nextButton = $("<li class='page-item'><a class='page-link' href='#'>></a></li>");
        nextButton.click(function (event) {
            event.preventDefault();
            if (paginaActual < totalPaginas) {
                cargarImagenesYActivarEdicion(paginaActual + 1);
            }
        });
    
        paginationList.append(prevButton);
    
        // Calcula el rango de páginas a mostrar (máximo 5 páginas)
        let startPage = Math.max(1, paginaActual - 2);
        let endPage = Math.min(startPage + 4, totalPaginas);
    
        for (let i = startPage; i <= endPage; i++) {
            let pageButton = $("<li class='page-item'><a class='page-link' href='#'>" + i + "</a></li>");
    
            if (i === paginaActual) {
                pageButton.addClass("active");
            }
    
            pageButton.click(function (event) {
                event.preventDefault();
                let newPage = parseInt($(this).text());
                cargarImagenesYActivarEdicion(newPage);
                history.pushState({}, "", "index2.php?page=" + newPage);
            });
    
            paginationList.append(pageButton);
        }
    
        paginationList.append(nextButton);
    }
    

    // Llamada inicial para generar la paginación
    cargarImagenesYActivarEdicion(1);  

    // Llama a la función para adjuntar el manejador de eventos
    GuardarDescripcionAJAX(); 


//Función para el modo oscuro de la página
function ModoOscuro() {
            $(document).ready(function() {
                // Función para guardar el estado del modo en una cookie
                function saveDarkModeStateToCookie(isDarkMode) {
                    document.cookie = `darkMode=${isDarkMode}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/`;
                }
            
                // Función para cargar el estado del modo desde la cookie
                function loadDarkModeStateFromCookie() {
                    const cookies = document.cookie.split(';');
                    for (const cookie of cookies) {
                        const [name, value] = cookie.trim().split('=');
                        if (name === 'darkMode') {
                            return value === 'true';
                        }
                    }
                    return false;
                }
            
                // Función para habilitar el modo oscuro
                function enableDarkMode() {
                    console.log("Modo oscuro activado");
                    $("body").addClass("dark");
                    $(".card-body").addClass("dark");
                    $(".modal-body").addClass("dark");
                    $(".mode-text").text("Modo Oscuro");
                    $(".LogoVierciBlanco").css("display", "block");
                    $(".LogoVierciAzul").css("display", "none");
                    $(".titulo").css("color", "white");
                    $(".fab").css("background-color", "#242526");
                    $(".fab-menu").css("background-color", "#242526");
                    $(".fab-menu-btn").css("background-color", "#242526");
                    $(".fab").css("color", "white");
                    $(".fab-menu").css("color", "white");
                    $(".fab-menu-btn").css("color", "white");
                    $(".page-link").css("background-color", "#18191a");
                    $(".page-link").css("color", "white");
                    $(".page-link").hover(function() {
                        $(this).css("background-color", "#20327e");
                    }, function() {
                        $(this).css("background-color", "#18191a");
                        $(this).css("color", "white");
                    });
                    $(".fab").hover(function() {
                        $(this).css("background-color", "#3a3b3c");
                        $(this).css("color", "white");
                    }, function() {
                        $(this).css("background-color", "#242526");
                        $(this).css("color", "white");
                    });
                    $(".fab-menu-btn").hover(function() {
                        $(this).css("background-color", "#3a3b3c");
                        $(this).css("color", "white");
                    }, function() {
                        $(this).css("background-color", "#242526");
                        $(this).css("color", "white");
                    });
                }
            
                // Función para deshabilitar el modo oscuro
                function disableDarkMode() {
                    console.log("Modo oscuro desactivado");
                    $("body").removeClass("dark");
                    $(".card-body").removeClass("dark");
                    $(".modal-body").removeClass("dark");
                    $(".mode-text").text("Modo Claro");
                    $(".LogoVierciBlanco").css("display", "none");
                    $(".LogoVierciAzul").css("display", "block");
                    $(".titulo").css("color", "#20327e");
                    $(".fab").css("background-color", "#FFF");
                    $(".fab-menu").css("background-color", "#FFF");
                    $(".fab-menu-btn").css("background-color", "#FFF");
                    $(".fab").css("color", "#707070");
                    $(".fab-menu").css("color", "#707070");
                    $(".fab-menu-btn").css("color", "#707070");
                    $(".page-link").css("background-color", "white");
                    $(".page-link").css("color", "#20327e");
                    $(".page-link").hover(function() {
                        $(this).css("background-color", "#20327e");
                        $(this).css("color", "white");
                    }, function() {
                        $(this).css("background-color", "#FFF");
                        $(this).css("color", "#20327e");
                    }); 
                    $(".fab").hover(function() {
                        $(this).css("background-color", "#20327e");
                        $(this).css("color", "white");
                    }, function() {
                        $(this).css("background-color", "white");
                        $(this).css("color", "#707070");
                    });
                    $(".fab-menu-btn").hover(function() {
                        $(this).css("background-color", "#20327e");
                    }, function() {
                        $(this).css("background-color", "#FFF");
                    });
                }
            
                // Cargar el estado del modo al cargar la página
                const isDarkMode = loadDarkModeStateFromCookie();
                if (isDarkMode) {
                    enableDarkMode();
                } else {
                    disableDarkMode();
                }
            
                // Manejar el cambio de modo
                $(document).on('click', '#darkModeSwitch', function() {
                    const isDarkMode = $("body").hasClass("dark");
                    if (isDarkMode) {
                        disableDarkMode();
                    } else {
                        enableDarkMode();
                    }
                    // Guardar el estado del modo en una cookie
                    saveDarkModeStateToCookie(!isDarkMode);
                });
                $(document).off('click', '#darkModeSwitch').on('click', '#darkModeSwitch', function() {
                    const isDarkMode = $("body").hasClass("dark");
                    if (isDarkMode) {
                        disableDarkMode();
                    } else {
                        enableDarkMode();
                    }
                    saveDarkModeStateToCookie(!isDarkMode);
                });
            });
}
// Controlador de la carga de imágenes
$(document).ready(function () {
    //la función se ejecuta cuando se hace click en el botón de cargar imágenes
    $("#btn-new-post-photo").click(function () {
        let formData = new FormData($("#uploadForm")[0]);

        $(this).prop('disabled', true);

        console.log("Iniciando carga de imágenes...");

        $.ajax({
            type: "POST",
            url: "controllers/new-post-photo.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log("Respuesta exitosa de la carga de imágenes:", response);

                if (response.success) {
                    // Elimina todas las imágenes existentes antes de agregar las nuevas
                    console.log("Eliminando imágenes existentes...");
                    $("#image-container").empty();  

                    //Entonces carga las imágenes cuando se haya eliminado las anteriores
                    //para despues volver a cargar las imágenes
                    console.log("Cargando imágenes...");
                    cargarImagenesYActivarEdicion(1);
               
                    // Mostrar mensaje de éxito
                    console.log("Mensaje de éxito:", response.success);
                    alert(response.success); 
                    $("#btn-new-post-photo").prop('disabled', false);
                } else if (response.error) {
                    // Mostrar mensaje de error
                    console.log("Mensaje de error:", response.error);
                    alert(response.error);
                    $("#btn-new-post-photo").prop('disabled', false);
                }
            },
            error: function (error) {
                // Maneja errores aquí.
                console.log("Error al cargar imágenes:", error);
                alert("Hubo un error al subir las imágenes." + error);
            }
        });
    });
});

//Publicar Varias imágenes al seleccionar
// Función para manejar la publicación de imágenes seleccionadas
$(document).ready(function() {
    // Crear el contenedor de botones de acción una vez al cargar la página
    let actionButton = document.getElementsByClassName("PublicarVarios")[0];

    let $actionButton = $(actionButton);
    
    $actionButton.on('click', function() {
        let selectedImages = $('.image-checkbox:checked').map(function() {
            return $(this).data('image-id');
        }).get();

        if (selectedImages.length === 0) {
            alert('No has seleccionado ninguna imagen.');
            return;
        }

        console.log('Imágenes seleccionadas:', selectedImages);

        // Realizar la solicitud AJAX para publicar las imágenes seleccionadas
        $.ajax({
            url: 'ImagenesSueltas/publicarVariasImg.php',
            type: 'POST',
            data: { selectedImages: selectedImages },
            success: function(response) {
                alert("Estado Público de las Imágenes Actualizadas");
                // Actualizar el estado de las imágenes en la interfaz de usuario
                selectedImages.forEach(function(imageId) {
                    let $button = $(`[data-image-id="${imageId}"]`);
                    let $icon = $button.find('i');
                    if ($icon.hasClass('bi-eye-slash')) {
                        $icon.removeClass('bi-eye-slash').addClass('bi-eye');
                    } else {
                        $icon.removeClass('bi-eye').addClass('bi-eye-slash');
                    }

                    $("#image-container").empty(); 
                    cargarImagenesYActivarEdicion(1);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                alert('Hubo un error al intentar publicar las imágenes.');
            }
        });
    });
});

$(document).ready(function() {
    let actionButton = document.getElementsByClassName("DescargarVarios")[0];
    let $actionButton = $(actionButton);

    $actionButton.on('click', async function() {
        let selectedImages = $('.image-checkbox:checked').map(function() {
            return $(this).data('image-id');
        }).get();

        if (selectedImages.length === 0) {
            alert('No has seleccionado ninguna imagen.');
            return;
        }

        // Registrar los IDs de las imágenes seleccionadas en la consola
        console.log('IDs de las imágenes seleccionadas:', selectedImages);

        // Realizar la solicitud AJAX para obtener los detalles de las imágenes seleccionadas
        $.ajax({
            url: 'ImagenesSueltas/DescargarVariasImagenes.php',
            type: 'POST',
            data: { selectedImages: selectedImages },
            success: async function(response) {
                let imagesDetails = JSON.parse(response);

                if (imagesDetails.error) {
                    alert(imagesDetails.error);
                    return;
                }

                // Crea un nuevo archivo ZIP usando JSZip
                let zip = new JSZip();

                // Contador para las imágenes
                let imageCounter = 1;

                // Mapea las imágenes a promesas que se resolverán al descargar cada imagen
                let imagePromises = imagesDetails.map(async function (imageDetail) {
                    let description = imageDetail.descripcion;
                    let imageUrl = `./assets/images/posts/${imageDetail.imagen}`;
                    let imageName = imageUrl.split('/').pop();

                    // Nuevo nombre para la imagen usando la descripción y el contador
                    let newImageName = `${description}_Imagen ${imageCounter}.${imageName.split('.').pop()}`;
                    console.log("Nuevo nombre de la imagen:", newImageName);

                    // Incrementa el contador de imágenes
                    imageCounter++;

                    // Carga la imagen desde la ruta especificada
                    console.log(`Cargando imagen: ${imageUrl}`);

                    let imageBlob = await fetch(imageUrl).then((response) => {
                        if (!response.ok) {
                            throw new Error(`No se pudo cargar la imagen ${imageUrl}: ${response.statusText}`);
                        }
                        console.log(`Imagen cargada: ${imageUrl}`);
                        return response.blob();
                    }).catch(error => {
                        console.error(error);
                        return null;
                    });

                    if (imageBlob) {
                        // Añade la imagen al archivo ZIP
                        zip.file(newImageName, imageBlob);
                        console.log(`Imagen agregada al ZIP: ${newImageName}`);
                    }
                });

                // Espera a que todas las imágenes se hayan descargado y añadido al ZIP
                await Promise.all(imagePromises);

                // Genera el archivo ZIP y lo descarga
                zip.generateAsync({ type: "blob" }).then(function (zipBlob) {
                    // Crea un enlace temporal para descargar el archivo ZIP
                    let tempLink = document.createElement("a");
                    let zipUrl = window.URL.createObjectURL(zipBlob);

                    tempLink.href = zipUrl;
                    tempLink.download = `imagenes_seleccionadas.zip`;
                    console.log("Nombre de archivo descargado: imagenes_seleccionadas.zip");

                    tempLink.click();

                    // Revoca el objeto URL temporal
                    window.URL.revokeObjectURL(zipUrl);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                alert('Hubo un error al intentar descargar las imágenes.');
            }
        });
    });
});





$("#search-form").on("submit", function(e) {
  e.preventDefault(); // Evita que el formulario se envíe de manera tradicional

    let searchTerm = $("#search-input").val();

    $.ajax({
        url: "ImagenesSueltas/buscar_img.php",
        method: "POST",
        data: { search: searchTerm },
        dataType: "json",
        success: function(data) {
        if (data.error === 'no_images_found') {
            alert('Ninguna imagen fue encontrada');
        } else if (data.error === 'empty_search') {
            alert('Ingresa algo en la consulta por favor');
        } else {
                // Manejar el caso de que se encontraron imágenes
                console.log("Imágenes encontradas:", data);
        
                // Limpiar la galería antes de agregar nuevas imágenes
                let container = $("#image-container"); // El contenedor de imágenes
                container.empty();
                

                generarBotonesPaginacion(data.totalPaginas, pagina=1);
                generarListadoImagenes(data);
            }
        },
        
        error: function(xhr, status, error) {
            console.log('Error en la solicitud AJAX:');
            console.log('Status:', status);
            console.log('Error:', error);
        }
    });
}); 


 //Función BotonEliminar
function BotonEliminar() {
    $(".delete-button").click(function(event) {
        event.preventDefault();

        const paginaActual = parseInt($('.page-item.active .page-link').text()); // Captura la página actual

        const imageId = $(this).data("image-id");
        const confirmacion = confirm("¿Quieres eliminar la imagen?");

        if (confirmacion) {
            $.ajax({
                url: "ImagenesSueltas/eliminar-imagen.php",
                method: "POST",
                data: { id_imagen: imageId },
                dataType: "json",
                success: function(response) {
                    if (response.success) {
                        $(`#col${imageId}`).remove(); // Elimina la imagen

                        // Recalcular la página actual después de eliminar

                        const newPage = paginaActual;

                        // Volver a cargar la página correspondiente a la imagen eliminada
                        cargarImagenesYActivarEdicion(newPage);

                        setTimeout(function () {
                            alert("Imagen Eliminada Exitosamente.");
                        }, 100);
                    } else {
                        alert("Error al eliminar la imagen: " + response.error);
                    }
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    });
}
});



function GuardarDescripcionAJAX() {
    $(document).ready(function() {
        // Agregar el controlador de eventos una vez en el documento listo
        $('body').on('click', '#guardar-btn', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
            // Obtener los valores del formulario
            let form = $(this).closest('form');
            let newDescription = form.find('textarea[name="new-description"]').val();
            let imageId = form.find('input[name="id_imagen"]').val();
            let paginaActual = form.find('input[name="pagina_actual"]').val();
    
            console.log('newDescription:', newDescription);
            console.log('imageId:', imageId);
            console.log('paginaActual:', paginaActual);
    
            // Realizar la solicitud AJAX
            $.ajax({
                url: 'ImagenesSueltas/editar-descripcion.php',
                type: 'POST',
                data: {
                    'new-description': newDescription,
                    'id_imagen': imageId,
                    'pagina_actual': paginaActual
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status === 'success') {
                        // Actualiza la descripción en la página sin recargarla
                        let originalDescription = form.closest('.card-body').find('.original-description');
                        originalDescription.text(newDescription);
    
                        // Restaura la visibilidad de la descripción original y los botones
                        form.closest('.description-edit-container').hide();
                        originalDescription.show();
                        form.closest('.card-body').find('.botones-utilidades').show();
    
                        // Muestra un mensaje de éxito
                        alert(response.message);
                    } else {
                        // Muestra un mensaje de error
                        alert(response.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.log('Error en la solicitud AJAX:');
                    console.log('xhr:', xhr);
                    console.log('Status:', status);
                    console.log('Error:', error);
                }
            });
        });
    });    
//Eventos para la edicición de la descripción
$(document).ready(function() {
    $(document).on("click", ".btn-edit-description", function() {
        console.log("Botón de edición de descripción clickeado");

        let imageId = $(this).data("image-id");
        let cardBody = $(this).closest('.card-body');

        cardBody.find('.botones-utilidades, .original-description').hide();

        let descriptionEditContainer = $(`#description-edit-${imageId}`);

        descriptionEditContainer.addClass('visible');
        descriptionEditContainer.css('display', 'block');
    });

    $(document).on("click", ".cancel-edit", function(event) {
        console.log("Botón de cancelación de descripción clickeado");
        event.preventDefault()
        let imageId = $(this).data("image-id");
        let cardBody = $(this).closest('.card-body');

        $(`#description-edit-${imageId}`).hide();
        cardBody.find('.botones-utilidades, .original-description').show();

    });
});

}

$(document).ready(function() {
    // Manejar el evento de clic para los botones con la clase '.btn-publicar'
    $(document).on('click', '.btn-publicar', function() {
        var $button = $(this);
        var imageId = $button.data('image-id');

        // Registrar en consola el ID de la imagen
        console.log('ID de la imagen:', imageId);

        // Realizar la solicitud AJAX
        $.ajax({
            url: 'ImagenesSueltas/publicarImagen.php',
            method: 'POST',
            data: {
                id_imagen: imageId
            },
            success: function(response) {
                console.log('Respuesta del servidor:', response);
                if (response.success) {
                    var $icon = $button.find('i');
                    if (response.nuevo_estado == 1) {
                        $icon.removeClass('bi-eye-slash').addClass('bi-eye');
                        console.log('La imagen ahora está pública');
                    } else {
                        $icon.removeClass('bi-eye').addClass('bi-eye-slash');
                        console.log('La imagen ahora no está pública');
                    }
                    alert("Estado de la imagen cambiado con éxito.");
                } else {
                    console.error('Error al cambiar el estado de la imagen:', response.error);
                    alert("Error al cambiar el estado de la imagen: " + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
                alert("Error en la solicitud AJAX: " + error);
            }
        });

        // Registrar en consola que el botón fue clickeado
        console.log('Botón clickeado');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const fabButton = document.getElementById('fab');
    const fabMenu = document.getElementById('fab-menu');

    fabButton.addEventListener('click', function() {
        fabMenu.classList.toggle('show');
    });

    // Crear el elemento tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);

    // Función para mostrar el tooltip
    function showTooltip(event) {
        const tooltipText = event.target.closest('.fab-menu-btn').getAttribute('data-tooltip');
        tooltip.textContent = tooltipText;
        tooltip.style.left = `${event.pageX - tooltip.offsetWidth - 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
        tooltip.classList.add('visible');
    }

    // Función para ocultar el tooltip
    function hideTooltip() {
        tooltip.classList.remove('visible');
    }

    // Función para mover el tooltip con el mouse
    function moveTooltip(event) {
        tooltip.style.left = `${event.pageX - tooltip.offsetWidth - 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }

    // Seleccionar todos los botones con tooltips
    const buttons = document.querySelectorAll('.fab-menu-btn[data-tooltip]');

    // Añadir eventos de mouseover, mouseout y mousemove a cada botón
    buttons.forEach(button => {
        button.addEventListener('mouseover', showTooltip);
        button.addEventListener('mouseout', hideTooltip);
        button.addEventListener('mousemove', moveTooltip);
    });
});
