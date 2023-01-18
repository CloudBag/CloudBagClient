const {ipcRenderer} = require('electron');
const path = require('path');

let url;

function open_close_folder(folder_number) {
  let Folder = document.getElementById('Folder-' + folder_number);
  let File_Link = document.getElementsByClassName('Disappear-' + folder_number);
  let Arrow = document.getElementById('Arrow-' + folder_number);

  for (let x = 0; x < File_Link.length; x += 1) {
    console.log(File_Link[x].style.display);
    if (File_Link[x].style.display == 'none' || File_Link[x].style.display ==
        '') {
      File_Link[x].style.display = 'inline';
      Arrow.style.transform = 'rotate(180deg)';
    } else {
      File_Link[x].style.display = 'none';
      Arrow.style.transform = 'rotate(0deg)';
    }
    File_Link[x].addEventListener('click', (e) => {
      e.preventDefault();
      requestFile(File_Link[x].id);
    });
  }
}

ipcRenderer.send('url-request');
ipcRenderer.on('url-reply', (e, data) => {
  url = data;
});

function setEvent(e, folder_number) {
  e.preventDefault();
  let File_Link = document.getElementsByClassName('Disappear-' + folder_number);
  requestFile(File_Link[0].id);
}

async function requestFile(filePath) {
  let newPath = filePath.substring(1).replace('/', '%2F');
  console.log(newPath);
  console.log(path.join(url, 'GetFile', newPath));
  try {
    let response = await fetch(path.join(url, 'GetFile', newPath));
    if (response.status === 400) {
      console.log('no puede');
    } else {
      ipcRenderer.send('download', response.url);
    }
  } catch (e) {
    console.log('Error al conectar');
    console.error(e);
  }
}