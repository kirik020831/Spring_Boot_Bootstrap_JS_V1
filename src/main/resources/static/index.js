//___________________________________________________________________________________________________________________ //
//                                            Выводим всех пользователей                                              //
$(document).ready(function () {
    getAllUsers();
});
const table = document.querySelector('#tableAllUsers tbody');
let temp = '';

async function getAllUsers() {
    await fetch('/api/admin/list')
        .then((response) => response.json())
        .then((users) => {
            users.forEach(user => {

                let rolesString = "";
                user.roles.forEach(role => rolesString += role.name + " ");

                temp += "<tr>"
                temp += "<td>" + user.id
                temp += "<td>" + user.username + "</td>"
                temp += "<td>" + user.lastname + "</td>"
                temp += "<td>" + user.age + "</td>"
                temp += "<td>" + user.email + "</td>"
                temp += "<td>" + rolesString + "</td>"
                temp += "<td>"
                temp += "<button type='button' class='btn btn-info edit-btn'  " +
                    "onclick='getModalEdit(" + user.id + ")' data-toggle='modal'>Edit</button>"
                temp += "</td>"
                temp += "<td>"
                temp += "<button type='button' class='btn btn-danger' " +
                    "onclick='getModalDelete(" + user.id + ")' data-toggle='modal' >Delete</button>"
                temp += "</td>"

            });
            table.innerHTML = temp;
        });
    $("#tableAllUsers")
}

//____________________________________________________________________________________________________________________//
//                                            Редактируем пользователя                                                //
function edit() {
    let id = document.getElementById('editID').value;
    let username = document.getElementById('editFirstName').value;
    let lastname = document.getElementById('editLastName').value;
    let age = document.getElementById('editAge').value;
    let email = document.getElementById('editEmail').value;
    let password = document.getElementById('editPassword').value;
    let roles = document.getElementById('editRole').value;

    console.log(username)

    let rol = [];
    if (roles === "ADMIN") {
        let role = {
            'id': 1,
            'name': 'ADMIN'
        }
        rol.push(role)
    }
    if (roles === "USER") {
        let role = {
            'id': 2,
            'name': 'USER'
        }
        rol.push(role)
    }

    fetch('/api/admin/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id,
            username,
            lastname,
            age,
            email,
            password,
            'roles': rol
        })
    })
        .then(res => {

            console.log(res.json());
            location.assign('/admin')
        })
}

function getModalEdit(id) {
    fetch('/api/admin/' + id)
        .then(res => res.json())
        .then(user => {
            let modal = document.getElementById('modalData');
            modal.innerHTML = '<div class="modal fade"  id="modalEdit"  tabindex="-1" role="dialog" aria-hidden="true">\n' +
                '                            <div class="modal-dialog">\n' +
                '                                <div class="modal-content">\n' +
                '                                    <div class="modal-header">\n' +
                '                                        <h5 class="modal-title">Edit User</h5>\n' +
                '                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                                            <span aria-hidden="true">&times;</span>\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-body">\n' +
                '                                        <div class="row justify-content-center align-items-center">\n' +
                '                                            <form class="text-center" method="PUT" >\n' +
                '                                                <div class="modal-body col-md text-cente">\n' +
                '                                        <label class="font-weight-bold">ID</label>\n' +
                '                                        <input type="number"\n' +
                '                                               class="form-control" \n' +
                '                                               name="id" \n' +
                '                                               id="editID" value="' + user.id + '" \n' +
                '                                               readonly> \n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">First name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="username"\n' +
                '                                               id="editFirstName" value="' + user.username + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Last name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="lastname"\n' +
                '                                               id="editLastName" value="' + user.lastname + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Age</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="age"\n' +
                '                                               id="editAge" value="' + user.age + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Email</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="email"\n' +
                '                                               id="editEmail" value="' + user.email + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Password</label>\n' +
                '                                        <input type="password"\n' +
                '                                               class="form-control"\n' +
                '                                               name="password"\n' +
                '                                               id="editPassword" value="' + user.password + '"\n' +
                '                                               required>\n' +
                '                                        <br>\n' +
                '                                                    <label class="font-weight-bold">Role</label>\n' +
                '                                                    <select multiple size="2" class="form-control"  id="editRole"\n' +
                '                                                            name="roles" required>\n' +
                '                                                        <option value="ADMIN">ADMIN</option>\n' +
                '                                                        <option value="USER" >USER</option>\n' +
                '                                                    </select>\n' +
                '                                                </div>\n' +
                '                                            </form>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-footer">\n' +
                '                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close\n' +
                '                                        </button>\n' +
                '                                        <button type="submit" data-dismiss="modal" class="btn btn-info" onclick="edit()">Edit\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            $("#modalEdit").modal();
        });
}

//--------------------------------------------------------------------------------------------------------------------//
//                                            Удаляем пользователя                                                    //
function getDelete(id) {
    fetch('/api/admin/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        }
    })
        .then(res => {
            $('#' + id).remove();
            location.assign('/admin')
        });
}

function getModalDelete(id) {
    fetch('/api/admin/' + id)
        .then(res => res.json())
        .then(user => {
            let rolesString = "";
            user.roles.forEach(role => rolesString += role.name + " ");
            let modal = document.getElementById('modalData')
            modal.innerHTML = '<div class="modal fade"  id="delete"  tabindex="-1" role="dialog" aria-hidden="true">\n' +
                '                            <div class="modal-dialog">\n' +
                '                                <div class="modal-content">\n' +
                '                                    <div class="modal-header">\n' +
                '                                        <h5 class="modal-title">Edit User</h5>\n' +
                '                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                                            <span aria-hidden="true">&times;</span>\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-body">\n' +
                '                                        <div class="row justify-content-center align-items-center">\n' +
                '                                            <form class="text-center" method="PUT" >\n' +
                '                                                <div class="modal-body col-md text-cente">\n' +
                '                                        <label class="font-weight-bold">ID</label>\n' +
                '                                        <input type="number"\n' +
                '                                               class="form-control" \n' +
                '                                               name="id" \n' +
                '                                               value="' + user.id + '" \n' +
                '                                               readonly> \n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">First name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="username"\n' +
                '                                               value="' + user.username + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Last name</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="lastname"\n' +
                '                                               value="' + user.lastname + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Age</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="age"\n' +
                '                                               value="' + user.age + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Email</label>\n' +
                '                                        <input type="text"\n' +
                '                                               class="form-control"\n' +
                '                                               name="email"\n' +
                '                                               value="' + user.email + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +
                '                                        <label class="font-weight-bold">Password</label>\n' +
                '                                        <input type="password"\n' +
                '                                               class="form-control"\n' +
                '                                               name="password"\n' +
                '                                               value="' + user.password + '"\n' +
                '                                               readonly>\n' +
                '                                        <br>\n' +
                '                                                    <label class="font-weight-bold">Role</label>\n' +
                '                                                     <input type="text"\n' +
                '                                                     class="form-control"\n' +
                '                                                     name="role"\n' +
                '                                                     value="' + rolesString + '"\n' +
                '                                                     readonly>\n' +
                '                                                </div>\n' +
                '                                            </form>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-footer">\n' +
                '                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close\n' +
                '                                        </button>\n' +
                '                                        <button type="submit" data-dismiss="modal" class="btn btn-danger" onclick="getDelete(' + user.id + ')">Delete\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
            $("#delete").modal();
        });
}

//--------------------------------------------------------------------------------------------------------------------//
//                                           Добавляем пользователя                                                   //
async function addNewUser() {
    await document.getElementById('new').addEventListener('submit', e => {
        e.preventDefault()

        let username = document.getElementById('newFirstName').value;
        let lastname = document.getElementById('newLastName').value;
        let age = document.getElementById('newAge').value;
        let email = document.getElementById('newEmail').value;
        let password = document.getElementById('newPassword').value;
        let role = document.getElementById('newRole').value;

        let rol = [];
        if (role === "ADMIN") {
            let role = {
                'id': 1,
                'name': 'ADMIN'
            }
            rol.push(role)
        }
        if (role === "USER") {
            let role = {
                'id': 2,
                'name': 'USER'
            }
            rol.push(role)
        }

        fetch('/api/admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                lastname,
                age,
                email,
                password,
                'roles': rol
            })
        })
            .then(res =>
                console.log(res.json()))
            .then(data => location.assign('/admin'))
    })
}