
ModoOscuro();
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
            $(".page-link").css("background-color", "#18191a");
            $(".page-link").css("color", "white");
            //add a hover to the page-link
            $(".page-link").hover(function() {
                $(this).css("background-color", "#0D6EFD");
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
            $(".mode-text").text("Modo Claro");
            $(".LogoVierciBlanco").css("display", "none");
            $(".LogoVierciAzul").css("display", "block");
            $(".page-link").css("background-color", "white");
            $(".page-link").css("color", "#0D6EFD");
            $(".page-link").hover(function() {
                $(this).css("background-color", "#0D6EFD");
                $(this).css("color", "white");
            }, function() {
                $(this).css("background-color", "#FFF");
                $(this).css("color", "#0D6EFD");
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