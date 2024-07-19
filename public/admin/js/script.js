//Pagination
const buttonPagination = document.querySelectorAll('[data-page]');
if (buttonPagination) {
    buttonPagination.forEach(button => {
        button.addEventListener('click', ()=> {
            let url = new URL(window.location.href);
            const page = button.getAttribute('data-page');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        });
    });
}
//End Pagination

//Delete Item
const buttonDelete = document.querySelectorAll('[button-delete]');
if (buttonDelete.length > 0) {
    const formDelete = document.querySelector('#form-delete');
    buttonDelete.forEach(button => {
        button.addEventListener('click', ()=> {
            const isConfirm = confirm('Are you sure?');

            if (isConfirm) {
                const id = button.getAttribute('data-id');
                formDelete.action = `products/delete/${id}?_method=DELETE`;
                formDelete.submit();
            }
        });
    });
}
//End Delete Item

//Check Multi
const checkboxMulti = document.querySelector('[checkbox-multi]');
const checkAll = document.querySelector('#check-all');
if (checkAll) {
    const checkItem = checkboxMulti.querySelectorAll('.check-item');

    checkAll.addEventListener('click', ()=> {
        if (checkAll.checked) {
            checkItem.forEach(item => {
                item.checked = true;
            });
        } else {
            checkItem.forEach(item => {
                item.checked = false;
            });
        }
    });

    if (checkItem.length > 0) {
        checkItem.forEach(item => {
            item.addEventListener('click', ()=> {
                const itemChecked = checkboxMulti.querySelectorAll('.check-item:checked');
                checkAll.checked = itemChecked.length === checkItem.length;
            });
        });
    }
}
//End Check Multi

//Delete Multi
const formDeleteAll = document.querySelector('.form-delete-all');
if (formDeleteAll) {
    formDeleteAll.addEventListener('submit', (e)=> {
        e.preventDefault();
        const isConfirm = confirm('Are you sure?');
        if (isConfirm) {
            const itemChecked = checkboxMulti.querySelectorAll('.check-item:checked');
            if (itemChecked.length > 0) {
                let ids = [];
                itemChecked.forEach(item => {
                    ids.push(item.getAttribute('data-id'));
                    console.log(ids);
                });
                const idDeleteMulti = formDeleteAll.querySelector('[id-delete-multi]');
                idDeleteMulti.value = ids.join(', ');
                formDeleteAll.submit();
            }
        }
    });
}
//End Delete Multi

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

//Upload Image Preview
const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
    const imagePreview = uploadImage.querySelector('[upload-image-preview]');
    const inputImage = uploadImage.querySelector('[upload-image-input]');
    const closeButton = uploadImage.querySelector('[close-image-preview]');
    inputImage.addEventListener('change', ()=> {
        const file = inputImage.files[0];
        if (file) {
            imagePreview.src = URL.createObjectURL(file);
        }
        closeButton.classList.remove('d-none');
    });
    closeButton.addEventListener('click', ()=> {
        imagePreview.src = '';
        inputImage.value = '';
        closeButton.classList.add('d-none');
    });
}
//End Upload Image Preview
