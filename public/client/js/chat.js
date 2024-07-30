import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'

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
            socket.emit('CLIENT_SEND_TYPING', 'hidden');
        }
    });
}
//End CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on('SERVER_RETURN_MASSAGE', (data) => {
    const chatList = document.querySelector('#chat2 .card-body');
    const div = document.createElement('div');
    const myId = document.querySelector('#chat2[my-id]').getAttribute('my-id');
    const typing = document.querySelector('#chat2 .box-typing');
    if (data.user_id === myId) {
        div.classList.add('out-going', 'd-flex', 'flew-row', 'justify-content-end', 'mb-3');
        div.innerHTML =
        `
            <div>
                <p class="small p-2 me-2 mb-1 text-white rounded-3 bg-primary">${ data.message }</p>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
        `
    } else {
        div.classList.add('in-coming', 'd-flex', 'flew-row', 'justify-content-start', 'mb-3');
        div.innerHTML =
            `
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
                <div>
                    <p class="small ms-2 mb-1 rounded-3 text-muted">${ data.userName }</p>
                    <p class="small p-2 ms-2 mb-1 rounded-3" style="background: #ecebeb;">${ data.message }</p>
                </div>
            `
    }

    chatList.insertBefore(div, typing);
    chatList.scrollTop = chatList.scrollHeight;
});
//End SERVER_RETURN_MESSAGE

//Scroll to bottom
const chatBody = document.querySelector('#chat2 .card-body');
if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight;
}
//End Scroll to bottom

//Emoji
const button = document.querySelector('.button-icon')
if (button) {
    const tooltip = document.querySelector('.tooltip')
    Popper.createPopper(button, tooltip)
    button.onclick = () => {
        tooltip.classList.toggle('shown');
    }
}

const emojiPicker = document.querySelector('emoji-picker');
if (emojiPicker) {
    const input = document.querySelector('#chat2 .inner-form input');
    emojiPicker.addEventListener('emoji-click', (event) => {
        input.value += event.detail.unicode;
        const end = input.value.length;
        input.focus();
        input.setSelectionRange(end, end);
    });
}
//End Emoji

//CLIENT_SEND_TYPING
const input = document.querySelector('#chat2 .inner-form input');
if (input) {
    input.addEventListener('keydown', () => {
        socket.emit('CLIENT_SEND_TYPING', 'show');
    });
    input.addEventListener('blur', () => {
        socket.emit('CLIENT_SEND_TYPING', 'hidden');
    });
}
//End CLIENT_SEND_TYPING

//SERVER_RETURN_TYPING
socket.on('SERVER_RETURN_TYPING', (data) => {
    const body = document.querySelector('#chat2 .card-body');
    const typing = document.querySelector('#chat2 .box-typing');
    const div = document.createElement('div');
    if (data.option === 'show') {
        const existTyping = document.querySelector(`#chat2 .box-typing div[userId="${data.user_id}"]`);
        if (!existTyping) {
            div.setAttribute('userId', data.user_id);
            div.classList.add('d-flex', 'flew-row', 'justify-content-start', 'mb-3');
            div.innerHTML =
                `
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
                <div>
                    <p class="small ms-2 mb-1 rounded-3 text-muted">${data.userName}</p>
                    <p class="small p-2 ms-2 mb-1 rounded-3" style="background: #ecebeb">Typing...</p>
                </div>
            `
            typing.appendChild(div);
            body.scrollTop = body.scrollHeight;
        }
    } else {
        const typingRemove = typing.querySelector(`#chat2 .box-typing div[userId="${data.user_id}"]`);
        if (typingRemove) {
            typing.removeChild(typingRemove);
        }
    }
});
//End SERVER_RETURN_TYPING