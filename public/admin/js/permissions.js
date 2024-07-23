//Permissions
const tablePermissions = document.querySelector('[table-permissions]');
if (tablePermissions) {
    let permissions = [];
    const buttonSubmit = document.querySelector('[button-submit]');
    buttonSubmit.addEventListener('click', () => {
        const row = tablePermissions.querySelectorAll('tr[data-name]');
        row.forEach((item) => {
            const name = item.getAttribute('data-name');
            if (name ==='id') {
                const inputs = item.querySelectorAll('input');
                inputs.forEach((input) => {
                    permissions.push({
                        id: input.value,
                        permissions: []
                    });
                });
            } else {
                const inputs = item.querySelectorAll('input');
                inputs.forEach((input, index) => {
                    if (input.checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });

        if (permissions.length > 0) {
            const formPermissions = document.querySelector('#form-permissions');
            const inputPermissions = formPermissions.querySelector('#input-permissions');
            inputPermissions.value = JSON.stringify(permissions);
            formPermissions.submit();
        }
    });
}
//End Permissions

//Permissions Default
const dataRoles = document.querySelector('[data-roles]');
if (dataRoles) {
    const roles = JSON.parse(dataRoles.getAttribute('data-roles'));
    roles.forEach((role, index) => {
        const permissions = role.permissions;
        permissions.forEach((permission) => {
            const dataName = document.querySelector(`[data-name="${permission}"]`);
            const input = dataName.querySelectorAll('input')[index];
            input.checked = true;
        });
    });
}
//End Permissions Default