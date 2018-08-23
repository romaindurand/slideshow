<template>
  <div class="container">
    <h1>CLIQUEZ</h1>
    <input type="file" webkitdirectory @change="handleFileInput" class="fileInput"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
const {ipcRenderer} = window.require('electron')
export default {
  name: 'ImportImages',
  methods: {
    ...mapMutations(['setImages', 'setFolderPath', 'setIndex']),
    handleFileInput (event) {
      const folder = event.target.files.item(0)
      this.setFolderPath(folder.path)
      ipcRenderer.on('set-folder-reply', (event, config) => {
        this.setImages(config.images)
      })
      ipcRenderer.send('set-folder-request', folder.path)

      this.setIndex(0)
    }
  }
}
</script>

<style lang="less" scoped>
.container, .fileInput {
  height: 100vh;
  width: 100%;
}
.fileInput {
  position: absolute;
  opacity: 0;
  top: 0;
}
h1 {
  margin: 0;
}
</style>
