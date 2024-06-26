//Función para el modo oscuro de la página
function ModoOscuro() {
    $(document).ready(function() {
        // Función para guardar el estado del modo en una cookie
       /**
        * Estas funciones manejan el guardado y carga del modo oscuro desde el dato de la cookie alojada en la galería, 
        * así como también activa y desactiva los estilos en las funciones específicas de la página.
        * @param isDarkMode - El parámetro "isDarkMode es un valor booleano que indica si el modo oscuro
        * está activado en el momento ('true') o si está desactivado ('false').
        * @param enableDarkMode - La función enableDarkMode es la responsable de que cada estilo se agregue
        * correctamente a todos los modales que se visualizarán al abrir una imágen, los estilos de los componentes
        * de cada imágen y su vista en general.
        * @param disableDarkMode - Esta función quita los estilos que se hayan agregado anteriormente.
        */
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
            $(".dialogAlbum").addClass("dark");
            $(".wrapper").addClass("dark");
            $(".headerDialogAlbum").addClass("dark");
            $(".Main").addClass("dark");
            $(".imagenDivDialogAlbum").addClass("dark");
            $(".mode-text").text("Modo Oscuro");
            $(".LogoVierciBlanco").css("display", "block");
            $(".LogoVierciAzul").css("display", "none");
            $(".page-link").css("background-color", "#18191a");
            $(".page-link").css("color", "white");
            $(".headerTextoDialogAlbum").css("color", "white");
            $(".footerDialogAlbum").css("background-color", "rgb(97, 97, 97)");
            $(".cancelFooterDialogAlbum").css("background-color", "rgb(97, 97, 97)");
            $(".texto-principal").css("color", "white");
            $(".titulo").css("color", "white");
            $(".fab").css("background-color", "#242526");
            $(".fab-menu").css("background-color", "#242526");
            $(".fab-menu-btn").css("background-color", "#242526");
            $(".fab").css("color", "white");
            $(".fab-menu").css("color", "white");
            $(".fab-menu-btn").css("color", "white");
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
            $(".page-link").hover(function() {
                $(this).css("background-color", "#20327e");
            }, function() {
                $(this).css("background-color", "#18191a");
            });
        }
    
        // Función para deshabilitar el modo oscuro
        function disableDarkMode() {
            console.log("Modo oscuro desactivado");
            $("body").removeClass("dark");
            $(".card-body").removeClass("dark");
            $(".modal-body").removeClass("dark");
            $(".dialogAlbum").removeClass("dark");
            $(".wrapper").removeClass("dark");
            $(".headerDialogAlbum").removeClass("dark");
            $(".Main").removeClass("dark");
            $(".imagenDivDialogAlbum").removeClass("dark");
            $(".mode-text").text("Modo Claro");
            $(".LogoVierciBlanco").css("display", "none");
            $(".LogoVierciAzul").css("display", "block");
            $(".page-link").css("background-color", "white");
            $(".page-link").css("color", "#0D6EFD");
            $(".headerTextoDialogAlbum").css("color", "rgb(0, 0, 0)");
            $(".footerDialogAlbum").css("background-color", "rgb(243, 244, 246)");
            $(".cancelFooterDialogAlbum").css("background-color", "rgb(243, 244, 246)");
            $(".cancelFooterDialogAlbum").css("color", "rgb(156, 163, 175)");
            $(".texto-principal").css("color", "#20327e");
            $(".titulo").css("color", "#20327e");
            $(".fab").css("background-color", "#FFF");
            $(".fab-menu").css("background-color", "#FFF");
            $(".fab-menu-btn").css("background-color", "#FFF");
            $(".fab").css("color", "#707070");
            $(".fab-menu").css("color", "#707070");
            $(".fab-menu-btn").css("color", "#707070");
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
            $(".page-link").hover(function() {
                $(this).css("background-color", "#20327e");
                $(this).css("color", "white");
            }, function() {
                $(this).css("background-color", "#FFF");
                $(this).css("color", "#20327e");
            });
        }
    
    /* Esta sección del código es responsable de manejar el funcionamiento del Modo Oscuro.
    Aquí un pequeño desglose de lo que hace cada parte: */
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
                // Desactivar el modo oscuro
                disableDarkMode();
            } else {
                // Activar el modo oscuro
                enableDarkMode();
            }
            // Guardar el estado del modo en una cookie
            saveDarkModeStateToCookie(!isDarkMode);
        });
        $(document).off('click', '#darkModeSwitch').on('click', '#darkModeSwitch', function() {
            const isDarkMode = $("body").hasClass("dark");
            if (isDarkMode) {
                // Desactivar el modo oscuro
                disableDarkMode();
            } else {
                // Activar el modo oscuro
                enableDarkMode();
            }
            // Guardar el estado del modo en una cookie
            saveDarkModeStateToCookie(!isDarkMode);
        });
    });
}

ModoOscuro();
