//Add Friend
const usersList = document.querySelectorAll('.users-list');
if (usersList.length > 0) {
    usersList.forEach((item) => {
        const addButton = item.querySelector('[add-friend-id]');
        if (addButton) {
            addButton.addEventListener('click', () => {
                item.classList.add('add');
                const friendId = addButton.getAttribute('add-friend-id');

                socket.emit("CLIENT_ADD_FRIEND", friendId);
            });
        }

        const cancelButton = item.querySelector('[cancel-add-friend-id]');
        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                item.classList.remove('add');
                const friendId = cancelButton.getAttribute('cancel-add-friend-id');

                socket.emit("CLIENT_CANCEL_ADD_FRIEND", friendId);
            });
        }
    });
}
//End Add Friend

//Accept, Regret
const acceptList = document.querySelectorAll('.accept-list');
if (acceptList) {
    acceptList.forEach((item) => {
        const acceptButton = item.querySelector('[accept-id]');
        if (acceptButton) {
            acceptButton.addEventListener('click', () => {
                item.classList.add('accepted');
                item.classList.remove('regretted');
                const friendId = acceptButton.getAttribute('accept-id');

                socket.emit("CLIENT_ACCEPT_FRIEND", friendId);
            });
        }

        const regretButton = item.querySelector('[regret-id]');
        if (regretButton) {
            regretButton.addEventListener('click', () => {
                item.classList.add('regretted');
                item.classList.remove('accepted');
                const friendId = regretButton.getAttribute('regret-id');

                const lengthBadge = document.querySelector('[length-badge]');
                if (lengthBadge) {
                    lengthBadge.innerHTML = `${parseInt(lengthBadge.innerHTML) - 1}`;
                }

                socket.emit("CLIENT_REGRET_FRIEND", friendId);
            });
        }
    });
}
//End Accept, Regret

//Return Length
socket.on('SERVER_RETURN_LENGTH', (data) => {
    const lengthBadge = document.querySelector('[length-badge]');
    if (lengthBadge) {
        const id = lengthBadge.getAttribute('length-badge');
        if (id === data.friendId) {
            lengthBadge.innerHTML = data.length;
        }
    }
});
//End Return Length

//Return Info
socket.on('SERVER_RETURN_INFO', (data) => {
    const acceptInfo = document.querySelector('[accept-info]');
    if (acceptInfo) {
        const id = acceptInfo.getAttribute('accept-info');
        if (id === data.friendId) {
            const div = document.createElement('div');
            div.classList.add('col-6');
            div.setAttribute('accept-data-id', data.userId)
            div.innerHTML =
                `
                <div class="d-flex align-items-center accept-list" style="gap: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 10px;">
                    <div class="img">
                        <img 
                        src="https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg" 
                        alt={data.fullName} 
                        style="width: 70px; height: auto; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%;" 
                        />
                    </div>
                    <div class="body">
                        <h5>${data.fullName}</h5>
                        <button class="btn btn-primary btn-sm" accept-id="${data.userId}">Accept</button>
                        <button class="btn btn-secondary btn-sm" regret-id="${data.userId}">Regret</button>
                        <button class="btn btn-primary btn-sm btn-accepted" disabled>Accepted</button>
                        <button class="btn btn-secondary btn-sm btn-regretted" disabled>Regretted</button>
                    </div>
                </div>
            `
            acceptInfo.appendChild(div);

            const acceptButton = div.querySelector('[accept-id]');
            if (acceptButton) {
                acceptButton.addEventListener('click', () => {
                    acceptButton.closest('.accept-list').classList.add('accepted');
                    acceptButton.closest('.accept-list').classList.remove('regretted');
                    const friendId = acceptButton.getAttribute('accept-id');

                    socket.emit("CLIENT_ACCEPT_FRIEND", friendId);
                });
            }

            const regretButton = div.querySelector('[regret-id]');
            if (regretButton) {
                regretButton.addEventListener('click', () => {
                    regretButton.closest('.accept-list').classList.add('regretted');
                    regretButton.closest('.accept-list').classList.remove('accepted');
                    const friendId = regretButton.getAttribute('regret-id');

                    const lengthBadge = document.querySelector('[length-badge]');
                    if (lengthBadge) {
                        lengthBadge.innerHTML = `${parseInt(lengthBadge.innerHTML) - 1}`;
                    }

                    socket.emit("CLIENT_REGRET_FRIEND", friendId);
                });
            }
        }
    }
});
//End Return Info

//Delete Info
socket.on('SERVER_DELETE_INFO', (data) => {
   const acceptInfo = document.querySelector('[accept-info]');
    if (acceptInfo) {
        const id = acceptInfo.getAttribute('accept-info');
        if (id === data.friendId) {
            const cancelBox = acceptInfo.querySelector(`[accept-data-id="${data.userId}"]`);
            if (cancelBox) {
                acceptInfo.removeChild(cancelBox);
            }
        }
    }

    const usersList = document.querySelector('[users-list-info]');
    if (usersList) {
        const id = usersList.getAttribute('users-list-info');
        if (id === data.friendId) {
            const cancelBox = usersList.querySelector(`[users-list-id="${data.userId}"]`);
            if (cancelBox) {
                usersList.removeChild(cancelBox);
            }
        }
    }
});
//End Delete info