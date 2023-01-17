const {ipcRenderer} = require('electron');

let url;
let fileCounter = 1;

function AddFileInput(){
    fileCounter++;
    let FileInputDiv =  document.createElement("div");
    FileInputDiv.id = "FileInput-" + fileCounter;
    FileInputDiv.className = "FileFormFields";

    let FileInputInput = document.createElement("input")
    FileInputInput.type = "file";
    FileInputInput.name = "File-" + fileCounter;
    FileInputInput.id = "File-" + fileCounter;
    FileInputInput.className = "File";

    FileInputDiv.append(FileInputInput);
    console.log(FileInputDiv);

    document.getElementById("FileInputsDiv").append(FileInputDiv);
    document.getElementById("File-" + fileCounter).addEventListener('change', AddFileInput, {once: true})

}

document.getElementById("File-1").addEventListener('change', AddFileInput, {once: true})

ipcRenderer.send('url-request');

ipcRenderer.on('url-reply', (e, data)=>{
    url=data;
});

const fileForm = document.getElementById("FileForm");

//
fileForm.addEventListener('submit', (e) => {
    fileForm.action = url + '/SendDataToCloudBag';
    console.log('hola');
    console.log(url);
    console.log(fileForm.action)
})


