require('dotenv').config()
const {ipcMain, app, BrowserWindow} = require('electron')
const fs = require('fs-extra')
const path = require('path')

app.on('ready', () => {
  const isDev = process.env.NODE_ENV === 'DEV'
  let window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { webSecurity: !isDev },
    autoHideMenuBar: true
  })
  if (isDev) {
    require('vue-devtools').install()
    window.webContents.openDevTools()
  }
  const url = isDev ? 'http://localhost:8080/' : `file://${process.cwd()}/dist/index.html`
  window.loadURL(url)
})

const extensions = ['jpg', 'png', 'gif', 'webp', 'jpeg', 'bmp']

ipcMain.on('set-folder-request', async (event, folderPath) => {
  console.log(folderPath)
  const configPath = path.join(folderPath, 'images.json')
  const exists = await fs.exists(configPath)
  let config
  if (exists) {
    let fileContent = await fs.readFile(configPath)
    config = JSON.parse(fileContent)
  } else {
    const files = await fs.readdir(folderPath)
    const images = files.filter(file => {
      const extension = file.toLowerCase().split('.').pop()
      return extensions.includes(extension)
    })
    config = {
      images,
      tags: []
    }
    let fileContent = JSON.stringify(config)
    await fs.writeFile(configPath, fileContent)
  }
  event.sender.send('set-folder-reply', config)
})
