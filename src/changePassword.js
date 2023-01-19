const {ipcRenderer} = require('electron')

const changePasswordForm=document.getElementById("changePasswordForm");

let user;
ipcRenderer.send('user-request');
ipcRenderer.on('user-reply', (e, data) => {
  console.log('user-reply');
  user = data;
  console.log(user)
});

changePasswordForm.addEventListener('submit',(e) => {
  e.preventDefault()
  console.log("changePasswordForm.addEventListener")
  let formData = [user.NickName,
    document.getElementById("oldPassword").value,
    user.rango,
    document.getElementById("newPassword").value,
    document.getElementById("confirmPassword").value]

  ipcRenderer.send('changeForm-submit', formData)



});


