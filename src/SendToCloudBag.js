const {ipcRenderer} = require('electron');

let url;
let fileCounter = 1;

function AddFileInput() {
  fileCounter++;
  let FileInputDiv = document.createElement('div');
  FileInputDiv.id = 'FileInput-' + fileCounter;
  FileInputDiv.className = 'FileFormFields';

  let FileInputInput = document.createElement('input');
  FileInputInput.type = 'file';
  FileInputInput.name = 'File-' + fileCounter;
  FileInputInput.id = 'File-' + fileCounter;
  FileInputInput.className = 'File';

  FileInputDiv.append(FileInputInput);

  document.getElementById('FileInputsDiv').append(FileInputDiv);
  document.getElementById('File-' + fileCounter).
      addEventListener('change', AddFileInput, {once: true});

}

document.getElementById('File-1').
    addEventListener('change', AddFileInput, {once: true});

ipcRenderer.send('url-request');

ipcRenderer.on('url-reply', (e, data) => {
  url = data;
});

const fileForm = document.getElementById('FileForm');

//
fileForm.addEventListener('submit', (e) => {
  fileForm.action = url + '/SendDataToCloudBag';
  let iframe = document.getElementById('hiddenFrame')
  iframe.addEventListener('load', (e) => {
    ipcRenderer.send('go-home');
  })
});


