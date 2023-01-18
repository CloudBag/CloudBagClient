const {ipcRenderer} = require('electron')

let url;
ipcRenderer.send('url-request');
ipcRenderer.on('url-reply', (e, data) => {
  url = data;
});

const getFiles=document.getElementById("GetFilesFromPC");

getFiles.addEventListener("click", (e) => {
  e.preventDefault()
  ipcRenderer.send('GetFiles')
})