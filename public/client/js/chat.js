//CLIENT_SEND_MESSAGE
const inputForm = document.querySelector('#chat2 .inner-form');
if (inputForm) {
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('#chat2 .inner-form input');
        const message = input.value;
        if (message) {
            socket.emit('CLIENT_SEND_MASSAGE', message);
            input.value = '';
        }
    });
}
//End CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MASSAGE', (data) => {
    const chatList = document.querySelector('#chat2 .card-body');
    const div = document.createElement('div');
    const myId = document.querySelector('#chat2[my-id]').getAttribute('my-id');
    if (data.user_id === myId) {
        div.classList.add('out-going', 'd-flex', 'flew-row', 'justify-content-end', 'mb-3');
        div.innerHTML =
        `
            <div>
                <p class="small p-2 me-2 mb-1 text-white rounded-3 bg-primary">${ data.message }</p>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
        `
    } else {
        div.classList.add('in-coming', 'd-flex', 'flew-row', 'justify-content-start', 'mb-3');
        div.innerHTML =
            `
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
                <div>
                    <p class="small ms-2 mb-1 rounded-3 text-muted">${ data.userName }</p>
                    <p class="small p-2 ms-2 mb-1 rounded-3" style="background: #ecebeb;">${ data.message }</p>
                </div>
            `
    }

    chatList.appendChild(div);
});
//End SERVER_RETURN_MESSAGE