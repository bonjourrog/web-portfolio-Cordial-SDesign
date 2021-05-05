const addProjectMessage = document.getElementById('addProjectMessage')
setTimeout(()=>{
    addProjectMessage.style.display = 'none'
}, '2500')

const close_open = document.getElementById('close-open')
const sidebar = document.getElementById('sidebar')

close_open.addEventListener('click', ()=>{
    let opc = 0
    if(sidebar.className.includes('opened')){
        opc = 1
    }

    if(sidebar.className.includes('closed')){
        opc = 2
    }

    switch(opc){
        case 1:
            sidebar.classList.remove('opened')
            sidebar.classList.add('closed')
            console.log('contiene opened');
        break;
        case 2:
            sidebar.classList.remove('closed')
            sidebar.classList.add('opened')
            console.log('contiene closed');
        break;
        default:
            console.log('nada');
        break;
    }

})
