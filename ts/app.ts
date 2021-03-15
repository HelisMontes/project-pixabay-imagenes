const formulario:any = document.querySelector('#formulario');
const resultado:any = document.querySelector('#resultado');
const termino:any = document.querySelector('#termino');


window.onload = () =>{
    formulario.addEventListener('submit', validateForm)
}

const validateForm = (e:any):void => {
    e.preventDefault();
    if(termino.value ===''){
        printMessage('Agregar un termino de busqueda');
        return;
    };
    searchPicture(termino.value)
}

const printMessage = (message:string):void => {
    const validateAlert:any = document.querySelector(" .bg-red-100");
    if(!validateAlert){
        const alert:any = document.createElement('p');
        alert.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded",  "max-w-lg", "mx-auto", "mt-6", "text-center");
        alert.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;
        formulario.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        },3000);
    };
};

const searchPicture = (termino:string) => {
    const apiKey:string = '20695987-7d0bb95dc28f03b09f60006df';
    const url:string = `https://pixabay.com/api/?key=${apiKey}&q=${termino}`;
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(result => printPictures(result.hits))
}

const printPictures = (pictures:any[])=>{
    while(resultado.firstChild){
        resultado.firstChild.remove();
    };

    pictures.map( imgs => {
        const {likes, views, previewURL, largeImageURL} = imgs
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
    })
}