//Cart Quantity
const inputQuantity = document.querySelectorAll('[input-quantity]');
if (inputQuantity) {
    inputQuantity.forEach(input => {
        input.addEventListener('change', () => {
            const quantity = parseInt(input.value);
            const productId = input.getAttribute('input-quantity');
            if (quantity > 0) {
                window.location.href = `/cart/update/${productId}?quantity=${quantity}`;
            }
        })
    })
}
//End Cart Quantity