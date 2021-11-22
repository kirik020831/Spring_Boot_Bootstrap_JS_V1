//___________________________________________________________________________________________________________________ //
//                                            Выводим всех пользователей                                              //
getAllUsers()
function getAllUsers () {
  $('#table').empty()
  $.getJSON('/api/admin/list', function (data) {
    $.each(data, function (key, user) {
      let roleAss = []
      for (let i = 0; i < user.roles.length; i++) {
        roleAss.push(user.roles[i].name)
      }
      $('#tableAllUsers').append($('<tr>').append(
        $('<td>').text(user.id),
        $('<td>').text(user.username),
        $('<td>').text(user.lastname),
        $('<td>').text(user.age),
        $('<td>').text(user.email),
        $('<td>').text(roleAss.join(', ')),
        $('<td>').
          append(
            '<button type=\'button\' data-toggle=\'modal\' class=\'btn-info btn\'' +
            ' data-target=\'#editUserModal\' data-user-id=\'' + user.id +
            '\'>Edit</button>'),
        $('<td>').
          append(
            '<button type=\'button\' data-toggle=\'modal\' class=\'btn btn-danger\'' +
            ' data-target=\'#deleteUserModal\' data-user-id=\'' + user.id +
            '\'>Delete</button>'),
        ),
      )
    })
  })
  $('[href="#admins"]').on('show.bs.tab', (e) => {
    location.reload()
  })
}
//____________________________________________________________________________________________________________________//
//                                            Редактируем пользователя                                                //
$('#editUserModal').on('show.bs.modal', (e) => {
  let userId = $(e.relatedTarget).data('user-id')

  $.ajax({
    url: '/api/admin/' + userId,
    type: 'GET',
    dataType: 'json',
  }).done((msg) => {
    let user = JSON.parse(JSON.stringify(msg))
    $.getJSON('/api/admin/roles', function (editRole) {
      $('#id').empty().val(user.id)
      $('#firstname').empty().val(user.username)
      $('#lastname').empty().val(user.lastname)
      $('#age').empty().val(user.age)
      $('#Email').empty().val(user.email)
      $('#password').empty().val(user.password)
      $('#roles').empty()
      $.each(editRole, (i, role) => {
        $('#roles').append(
            $('<option>').text(role.name),
        )
      })
      $('#roles').val(user.roles)
    })
  })
})

$('#buttonEditSubmit').on('click', (e) => {
  e.preventDefault()

  let editUser = {
    id: $('#id').val(),
    username: $('#firstname').val(),
    lastname: $('#lastname').val(),
    age: $('#age').val(),
    email: $('#Email').val(),
    password: $('#password').val(),
    roleNames: $('#roles').val(),
  }

  $.ajax({
    url: '/api/admin',
    type: 'PUT',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(editUser),
  })

  $('#editUserModal').modal('hide'),
      location.reload()
  getAllUsers()
})
//--------------------------------------------------------------------------------------------------------------------//
//                                            Удаляем пользователя                                                    //
$('#deleteUserModal').on('show.bs.modal', (e) => {
  let userId = $(e.relatedTarget).data('user-id')

  $.ajax({
    url: '/api/admin/' + userId,
    type: 'GET',
    dataType: 'json',
  }).done((msg) => {
    let user = JSON.parse(JSON.stringify(msg))

    $('#id1').empty().val(user.id)
    $('#firstname1').empty().val(user.username)
    $('#lastname2').empty().val(user.lastname)
    $('#age2').empty().val(user.age)
    $('#email2').empty().val(user.email)
    $('#delPas').empty().val(user.password)

    $('#buttonDelete').on('click', (e) => {
      e.preventDefault()

      $.ajax({
        url: '/api/admin/' + userId,
        type: 'DELETE',
        dataType: 'text',
      }).done((deleteMsg) => {
        $(`#deleteUserModal`).modal('hide')
        location.reload()
      })
    })
  })
})
//--------------------------------------------------------------------------------------------------------------------//
//                                           Добавляем пользователя                                                   //
$('[href="#new"]').on('show.bs.tab', (e) => {
  $.getJSON('/api/admin/roles', function (addNewUser) {
    $(() => {
      $('#name').empty().val('')
      $('#lastname3').empty().val('')
      $('#age3').empty().val('')
      $('#email3').empty().val('')
      $('#password3').empty().val('')
      $('#roles3').empty().val('')
      $.each(addNewUser, function (k, role) {
        $('#roles3').append(
            $('<option>').text(role.name),
        )
      })
    })
  })
})
$('#buttonNew').on('click', (e) => {
  e.preventDefault()

  let addNewUser = {
    username: $('#name').val(),
    lastname: $('#lastname3').val(),
    age: $('#age3').val(),
    email: $('#email3').val(),
    password: $('#password3').val(),
    roleNames: $('#roles3').val(),
  }
  let json = JSON.stringify(addNewUser);
  console.log(json);

  $.ajax({
    url: '/api/admin',
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: json,
  })
  getAllUsers(),
      $('#testTab a[href="#admins"]').tab('show')
  location.reload()
})
//--------------------------------------------------------------------------------------------------------------------//
//                                           Вывод пользователя в UIP                                                 //

$('[href="#users-panel"]').on('show.bs.tab', (e) => {
  $('#change-tabContent').hide(),
      getCurrent()
})
function getCurrent () {
  $.ajax({
    url: '/getUser',
    type: 'GET',
    dataType: 'json',
  }).done((msg) => {
    let user = JSON.parse(JSON.stringify(msg))
    let roleAss = []
    for (let i = 0; i < user.roles.length; i++) {
      roleAss.push(user.roles[i].name)
    }
    $('#current-user-table tbody').empty().append(
        $('<tr>').append(
            $('<td>').text(user.id),
            $('<td>').text(user.username),
            $('<td>').text(user.lastname),
            $('<td>').text(user.age),
            $('<td>').text(user.email),
            $('<td>').text(roleAss.join(', ')),
        ))
  }).fail(() => {
    alert('Error Get All Users!')
  })
}