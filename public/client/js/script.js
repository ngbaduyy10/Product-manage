//Close Alert
const successAlert = document.querySelector('[success-alert]');
if (successAlert) {
    setTimeout(()=> {
        successAlert.classList.add('hidden');
    }, 3000);

    const buttonClose = successAlert.querySelector('[close-alert]');
    buttonClose.addEventListener('click', ()=> {
        successAlert.classList.add('hidden');
    });
}
//End Close Alert