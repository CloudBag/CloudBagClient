const {ipcRenderer} = require('electron')

const loginForm=document.getElementById("LoginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let formData = [document.getElementById("nickName").value, document.getElementById("Password").value]
  let serverIp = document.getElementById('server').value;
  ipcRenderer.send('loginForm-submit', formData,serverIp)
});
