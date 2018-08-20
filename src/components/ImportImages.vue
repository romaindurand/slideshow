<template>
  <div>
    <input type="file" webkitdirectory @change="handleFileInput"/>
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

<style lang="less">
</style>
