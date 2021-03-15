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
    };
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