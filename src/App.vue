<template>
  <div>
    <ImportImages v-if="!currentImagePath" />
    <Slide v-if="currentImagePath" :image-path="currentImagePath"/>
  </div>
</template>

<script>
import ImportImages from './components/ImportImages.vue'
import Slide from './components/Slide.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: {
    ImportImages, Slide
  },
  computed: {
    ...mapGetters(['currentImagePath'])
  },
  methods: {
    ...mapMutations(['nextImage'])
  },
  mounted () {
    window.addEventListener('keyup', event => {
      console.log(event)
      switch (event.key) {
        case 'ArrowRight':
          this.nextImage()
          break
      }
    })
  }
}
</script>

<style lang="less">
</style>
