<template>
    <img ref="image" v-if="imagePath" :src="imagePath" :alt="imagePath" @click="resizeImage">
</template>

<script>
import { mapGetters } from 'vuex'
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
  methods: {
    resizeImage () {
      const image = this.$refs.image
      const imageRatio = image.height / image.width
      const windowRatio = window.innerHeight / window.innerWidth
      if (imageRatio < windowRatio) {
        image.style.height = window.innerWidth * imageRatio + 'px'
        image.style.paddingTop = (window.innerHeight - window.innerWidth * imageRatio) / 2 + 'px'
      } else {
        image.style.height = window.innerHeight + 'px'
        image.style.paddingTop = '0px'
      }
    }
  }
}
</script>
