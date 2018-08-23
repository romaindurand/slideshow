<template>
  <div class="background" :style="{
    backgroundColor: bgColor
  }">
    <ImportImages v-if="!currentImagePath" />
    <Slide ref="slide" v-if="currentImagePath" :image-path="currentImagePath"/>
  </div>
</template>

<script>
import ImportImages from './components/ImportImages.vue'
import Slide from './components/Slide.vue'
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    ImportImages, Slide
  },
  computed: {
    ...mapState(['bgColor']),
    ...mapGetters(['currentImagePath'])
  },
  methods: {
    ...mapMutations(['nextImage', 'previousImage']),
    ...mapActions(['toggleAutoplay', 'speedUp', 'speedDown'])
  },
  mounted () {
    window.addEventListener('resize', () => {
      if (!this.$refs.slide) return
      this.$refs.slide.resizeImage()
    })
    window.addEventListener('keyup', event => {
      switch (event.code) {
        case 'ArrowRight':
          this.nextImage()
          break

        case 'ArrowLeft':
          this.previousImage()
          break

        case 'ArrowUp':
          this.speedUp()
          break

        case 'ArrowDown':
          this.speedDown()
          break

        case 'Space':
          this.toggleAutoplay()
          break
      }
    })
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  overflow: hidden;
  background-color: rgb(22, 22, 22);
  height: 100vh;

  .background {
    height: 100vh;
    transition: background-color 500ms ease-out;
  }
}
</style>
