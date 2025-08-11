<template>
  <router-link
    :to="{
      name: 'icon-preview',
      params: {
        icon: iconLinkName,
      },
    }"
    @mouseenter="openCard"
    @mouseleave="closeCard"
    class="item"
    :class="{
      'cursor-pointer': hover
    }"
  >
    <div @click="copyToClipboard(cssClass)">
      <span class="mc-icon" :class="[cssClass]"></span>

      <div v-if="card.open" class="card-popup">
        <p>{{ this.icon.real_name }}</p>
      </div>
    </div>
  </router-link>
</template>
<style lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  content-visibility: auto;

  p {
    font-size: 0.7rem;
    white-space: nowrap;
  }

  .card-popup {
    position: absolute;
    z-index: 5;
    display: flex;
    flex-flow: row nowrap;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 0;
    left: 0;
  }
}
</style>
<script>

export default {
  name: 'MinecraftIcon',
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
    hover: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      card: {
        open: false,
      },
    }
  },
  methods: {
    copyToClipboard(text) {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    },
    openCard() {
      if(!this.hover) return;
      if (!this.card.open) this.card.open = true
    },
    closeCard() {
      if(!this.hover) return;
      if (this.card.open) this.card.open = false
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
    iconLinkName() {
      return encodeURI(this.icon.css_class)
    },
  },
}
</script>
