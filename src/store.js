import Vue from 'vue'
import Vuex from 'vuex'
import path from 'path'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folderPath: null,
    images: [],
    index: null
  },
  mutations: {
    setImages (state, images) {
      state.images = images
    },
    setFolderPath (state, path) {
      state.folderPath = path
    },
    setIndex (state, index) {
      state.index = index
    },
    nextImage (state) {
      state.index = state.index + 1 > state.images.length - 1 ? 0 : state.index + 1
    }
  },
  actions: {},
  getters: {
    currentImagePath: state =>
      state.images && state.images.length && Number.isInteger(state.index) && state.folderPath
        ? path.join('file:///', state.folderPath, state.images[state.index])
        : null
  }
})
