import Vue from 'vue'
import Vuex from 'vuex'
import path from 'path'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    folderPath: null,
    images: [],
    index: null,
    interval: 1000,
    intervalId: null,
    autoplay: false,
    bgColor: '#333',
    random: true
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
      if (state.random) {
        state.index = Math.round(Math.random() * (state.images.length - 1))
      } else {
        state.index = state.index + 1 > state.images.length - 1 ? 0 : state.index + 1
      }
    },
    previousImage (state) {
      state.index = state.index - 1 < 0 ? state.images.length - 1 : state.index - 1
    },
    setIntervalId (state, intervalId) {
      state.intervalId = intervalId
    },
    setInterval (state, interval) {
      state.interval = interval
    },
    setAutoplay (state, autoplay) {
      state.autoplay = autoplay
    },
    setBgColor (state, color) {
      state.bgColor = color
    }
  },
  actions: {
    async play ({commit, state, dispatch}) {
      await dispatch('pause')
      const intervalId = window.setInterval(() => {
        commit('nextImage')
      }, state.interval)
      commit('setIntervalId', intervalId)
      commit('setAutoplay', true)
    },

    pause ({commit, state}) {
      if (state.intervalId) window.clearInterval(state.intervalId)
      commit('setAutoplay', false)
      commit('setIntervalId', null)
    },

    toggleAutoplay ({state, dispatch}) {
      if (state.autoplay) dispatch('pause')
      else dispatch('play')
    },

    speedUp ({state, commit, dispatch}) {
      commit('setInterval', state.interval / 2)
      dispatch('play')
    },

    speedDown ({state, commit, dispatch}) {
      commit('setInterval', state.interval * 2)
      dispatch('play')
    }
  },
  getters: {
    currentImagePath: state =>
      state.images && state.images.length && Number.isInteger(state.index) && state.folderPath
        ? path.join('file:///', state.folderPath, state.images[state.index])
        : null
  }
})
