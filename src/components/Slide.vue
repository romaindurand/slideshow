<template>
  <img ref="image" v-if="imagePath" :src="imagePath" :alt="imagePath" @click="nextImage">
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Slide',
  props: {
    imagePath: {
      required: true,
      type: String
    }
  },
  computed: {
    ...mapGetters(['currentImagePath'])
  },
  mounted () {
    require('color-thief')
    const colorThief = new window.ColorThief()
    this.$refs.image.onload = () => {
      this.resizeImage()
      const colorValues = colorThief.getColor(this.$refs.image)
      const color = `rgb(${colorValues.join(',')})`
      this.setBgColor(color)
    }
  },
  methods: {
    ...mapMutations(['setBgColor', 'nextImage']),
    resizeImage () {
      const image = this.$refs.image
      const imageRatio = image.height / image.width
      const windowRatio = window.innerHeight / window.innerWidth
      if (imageRatio < windowRatio) {
        image.style.height = window.innerWidth * imageRatio + 'px'
        image.style.paddingTop = (window.innerHeight - window.innerWidth * imageRatio) / 2 + 'px'
        image.style.paddingLeft = '0px'
      } else {
        image.style.height = window.innerHeight + 'px'
        image.style.paddingTop = '0px'
        image.style.paddingLeft = (window.innerWidth / 2) - (image.width / 2) + 'px'
      }
    }
  }
}
</script>
