var formulario = document.querySelector('#formulario');
var resultado = document.querySelector('#resultado');
var termino = document.querySelector('#termino');

window.onload = function () {
    formulario.addEventListener('submit', validateForm);
};
var validateForm = function (e) {
    e.preventDefault();
    if (termino.value === '') {
        printMessage('Agregar un termino de busqueda');
    }
    ;
};
var printMessage = function (message) {
    var validateAlert = document.querySelector(" .bg-red-100");
    if (!validateAlert) {
        var alert_1 = document.createElement('p');
        alert_1.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");
        alert_1.innerHTML = "\n            <strong class=\"font-bold\">Error!</strong>\n            <span class=\"block sm:inline\">" + message + "</span>\n        ";
        formulario.appendChild(alert_1);
        setTimeout(function () {
            alert_1.remove();
        }, 3000);
    }
    ;
};
