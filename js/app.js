const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const paginacionDiv = document.querySelector('#paginacion');
const termino = document.querySelector('#termino');
const REGISTROPORPAGINAS = 30;
window.onload = () => {
    formulario.addEventListener('submit', validateForm);
};
const validateForm = (e) => {
    e.preventDefault();
    if (termino.value === '') {
        printMessage('Agregar un termino de busqueda');
        return;
    }
    ;
    searchPicture();
};
const printMessage = (message) => {
    const validateAlert = document.querySelector(" .bg-red-100");
    if (!validateAlert) {
        const alert = document.createElement('p');
        alert.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-lg", "mx-auto", "mt-6", "text-center");
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;
        formulario.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    };
};
const searchPicture = (pageActual) => {
    const apiKey = '20695987-7d0bb95dc28f03b09f60006df';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino.value}&per_page=${REGISTROPORPAGINAS}&page=${pageActual}`;
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(result => {
        const totalPages = quantityPages(result.totalHits);
        printPictures(result.hits, totalPages);
    });
};
const quantityPages = (total) => Math.ceil(total / REGISTROPORPAGINAS);
const printPictures = (pictures, pages) => {
    while (resultado.firstChild) {
        resultado.firstChild.remove();
    };
    pictures.map(imgs => {
        const { likes, views, previewURL, largeImageURL } = imgs;
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
            <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
                <div class="p-4">
                    <p class="card-text">${likes} Me Gusta</p>
                    <p class="card-text">${views} Vistas </p>
    
                    <a href=${largeImageURL} 
                    rel="noopener noreferrer" 
                    target="_blank" class="bg-blue-800 w-full p-1 block mt-5 rounded text-center font-bold uppercase hover:bg-blue-500 text-white">Ver Imagen</a>
                </div>
            </div>
        </div>
        `;
    });
    while (paginacionDiv.firstChild) {
        paginacionDiv.firstChild.remove();
    };
    createPages(pages);
};
const createPages = (pages) => {
    const iterador = generadorPages(pages);
    while (true) {
        const { value, done } = iterador.next();
        if (done) return;
        // Crear botón de sig
        const btnNext = document.createElement('a');
        btnNext.href = "#";
        btnNext.dataset.pagina = value;
        btnNext.textContent = value;
        btnNext.classList.add('siguiente', 'mx-auto', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'mx-auto', 'mb-10', 'font-bold', 'uppercase', 'rounded');
        paginacionDiv.appendChild(btnNext);
        btnNext.onclick = () => {
            searchPicture(value);
        };
    };
};
function* generadorPages(total) {
    for (let i = 1; i <= total; i++) {
        yield i;
    };
}
