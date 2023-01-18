const {app, BrowserWindow, ipcMain, dialog, nativeImage} = require('electron');
const path = require('path');
const ejse = require('ejs-electron');
const os = require('os');
const {validateUser} = require('./users.js');
const {default: fetch} = require('electron-fetch');

let mainWindow;
let user;
let url;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './public/images/logito.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the html of the app.
  mainWindow.loadFile(path.join(__dirname, 'views/login.ejs'));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
  });

  mainWindow.webContents.session.on('will-download', (event, item) => {
    item.setSaveDialogOptions({title: 'Guardar como'});
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('loginForm-submit', async function(event, formData, serverIp) {
  console.log('[User, password] ->', formData);
  console.log('ip ->', serverIp);
  url = 'http://' + serverIp + ':3000';
  exports.url = url;
  console.log(url);
  user = await validateUser(formData);
  console.log(user);
  if (user !== null) {
    mainWindow.loadFile(path.join(__dirname, 'views/home.ejs'));
    ejse.data('user', user.NickName);
    ejse.data('url', url);
  } else {
    dialog.showMessageBox(null, {
      type: 'warning',
      title: 'Login Failed',
      message: 'Asegurese que los datos ingresados sean correctos',
    });
    mainWindow.reload();
  }
});

ipcMain.on('url-request', function(event) {
  event.reply('url-reply', url);
});

ipcMain.on('GetFiles', async function(event) {
  try {
    let response = await fetch(url + '/GetFromPC');
    const files = await response.json();
    if (files != null) {
      ejse.data('CloudBagFiles', files);
      mainWindow.loadFile(path.join(__dirname, 'views/GetFromPC.ejs'));
    } else {
      mainWindow.loadFile(path.join(__dirname, 'views/login.ejs'));
    }
  } catch (e) {
    console.log('Error al conectar');
  }
});

ipcMain.on('download', function(event, url) {
  mainWindow.webContents.downloadURL(url);
});

ipcMain.on('go-home', function(event) {
  mainWindow.loadFile(path.join(__dirname, 'views/home.ejs'));
});