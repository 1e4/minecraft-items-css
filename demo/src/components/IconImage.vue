<template>
    <span class="mc-icon" :class="[cssClass]"></span>
</template>
<script>

export default {
  name: 'IconImage',
  props: {
    icon: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 32,
      required: false,
    },
  },
  computed: {
    cssClass() {
      const classes = []
      classes.push(this.icon.css_class)

      if (this.size) {
        classes.push(`icon-size-${this.size}`)
      }

      return classes
    },
  },
}
</script>
