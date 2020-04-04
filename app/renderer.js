//Elementos del DOM
const seleccionlink = document.querySelector('.links'); 
const errorM = document.querySelector('.error'); 
const formN = document.querySelector('.new-form'); 
const newUrl= document.querySelector('.new-link'); 
const newGuard = document.querySelector('.new-button'); 
const clearbtn = document.querySelector('.clear'); 

//DOM APIs
const parser = new DOMParser();
const {shell }= require('electron'); //nos permite sacar y usar elementos del pc

const parserRespuesta= text =>{
   return parser.parseFromString(text,'text/html' ); 
};

const findTitulo =(nodes)=>{
    return nodes.querySelector('title').innerText; 
};
const storeLink=(title,url)=>{
    localStorage.setItem(url,JSON.stringify({title,url}));
}

const getLinks=()=>{
    return Object.keys(localStorage)
    .map(key=> JSON.parse(localStorage.getItem(key))); 
}

const creatElemento = (link)=>{
    return (`<div>
                 <h3>${link.title}</h3>
                 <p>
                 <a href="${link.url}">${link.url}</a>
                 </p>
             </div>`);
}

const renderLinks =()=>{
    const linksElementos = getLinks().map(creatElemento).join('');
    seleccionlink.innerHTML = linksElementos; 
};
const clearForm =()=>{
    newUrl.value = null;
};

const handleError =(error,url)=>{
    errorM.innerHTML = 
    `pone bien el enlace "${url}" 
    : ${error.message}`.trim();
    setTimeout(()=>{
        errorM.innerHTML=null;
    }, 5000);
}
//EVENTOS

renderLinks(); 

//evento cuando alguien escribe algo
newUrl.addEventListener('keyup', ()=>{
    //el boton = al estado de validacion
    newGuard.disabled = !newUrl.validity.valid; 
});
//async = asincrono
//await = espera 
formN.addEventListener('submit', async (evento)=>{
    evento.preventDefault();//evita refrescar la ventana
    //console.log(newUrl.value);
    const url = newUrl.value; 
try {
    const respuesta = await fetch(url);
    const text = await respuesta.text();
   // console.log(text);  
    const html =  parserRespuesta(text); 
    //console.log(html);
    const titulo =  findTitulo(html);
    //console.log(titulo);
    storeLink(titulo, url); 
    clearForm();
    renderLinks(); 
} catch (error) {
    handleError(error, url); 
}
});
clearbtn.addEventListener('click',()=>{
    localStorage.clear(); 
    seleccionlink.innerHTML='';
});
seleccionlink.addEventListener('click',(e)=>{
    if(e.target.href){
        e.preventDefault();
        //console.log(e.target.href)
        shell.openExternal(e.target.href); 
    }
});