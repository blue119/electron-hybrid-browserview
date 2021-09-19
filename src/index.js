const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const { ElectronBlocker, fullLists, Request } = require('@cliqz/adblocker-electron');
var fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {

  // Create the browser window.
  // TODD, auto detecting
  let myWidth = 1900;
  let myHeight= 1080;
  mainWindow = new BrowserWindow({
    width: myWidth,
    height: myHeight,
  });

const blocker = ElectronBlocker.parse(fs.readFileSync('easylist.txt', 'utf-8'));
blocker.enableBlockingInSession(mainWindow.webContents.session);

  // and load the index.html of the app.
  // mainWindow.loadURL('https://disp.cc/m/');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  let word = process.argv[2];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The remote page
  let view = new BrowserView({
/*     webPreferences: {
      preload : `${__dirname}/preload.js` // needs full path
    } */
  })
  // BrowserView output will go into this console, not main window's devtools console.
  // view.webContents.openDevTools();
  mainWindow.addBrowserView(view)
  view.setBounds({ x: 0, y: 0, width: 950, height: 540 })
  view.webContents.loadURL('https://www.collinsdictionary.com/dictionary/english/' + word) 
  // replace with the url to your app ie - http://localhost:3000.

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The remote page
  let view2 = new BrowserView({
/*     webPreferences: {
      preload : `${__dirname}/preload.js` // needs full path
    } */
  })
  // BrowserView output will go into this console, not main window's devtools console.
  // view.webContents.openDevTools();
  mainWindow.addBrowserView(view2)
  view2.setBounds({ x: 950, y: 0, width: 950, height: 540 })
  view2.webContents.loadURL('https://www.merriam-webster.com/dictionary/' + word)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The remote page
  let view3 = new BrowserView({
/*     webPreferences: {
      preload : `${__dirname}/preload.js` // needs full path
    } */
  })
  // BrowserView output will go into this console, not main window's devtools console.
  // view.webContents.openDevTools();
  mainWindow.addBrowserView(view3)
  view3.setBounds({ x: 0, y: 540, width: 950, height: 540 })
  view3.webContents.loadURL('https://www.dictionary.com/browse/' + word)

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // The remote page
  let view4 = new BrowserView({
/*     webPreferences: {
      preload : `${__dirname}/preload.js` // needs full path
    } */
  })
  // BrowserView output will go into this console, not main window's devtools console.
  // view.webContents.openDevTools();
  mainWindow.addBrowserView(view4)
  view4.setBounds({ x: 950, y: 540, width: 950, height: 540 })
  view4.webContents.loadURL('https://www.urbandictionary.com/define.php?term=' + word)




  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("hello", (evt, name) => {
  console.log("received hello event=",name);
  mainWindow.getBrowserView().webContents.send("greeting",`Hi ${name}!`)
});
