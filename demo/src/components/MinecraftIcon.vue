<template>
  <router-link :to="{name: 'icon-preview', params: {
    icon: iconLinkName
  }}">
    <div class="item" @click="copyToClipboard(cssClass)"
         @mouseenter="openCard"
         @mouseleave="closeCard"
    >
      <span class="mc-icon" :class="[cssClass]"></span>

      <div v-if="card.open" class="card-popup">
        <p>{{ iconName }}</p>
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
  cursor: pointer;

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
  }
}

</style>
<script>
import {convertNameToCSS} from "@/helpers.js";

export default {
  name: 'MinecraftIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
    }
  },
  data() {
    return {
      card: {
        open: false,
      }
    }
  },
  methods: {
    copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    },
    openCard() {
      if (!this.card.open)
        this.card.open = true;
    },
    closeCard() {
      if (this.card.open)
        this.card.open = false;
    },
  },
  computed: {
    cssClass() {
      const classes = [];
      classes.push(convertNameToCSS(this.iconName))


      if(this.size) {
        classes.push(`icon-size-${this.size}`)
      }

      return classes
    },
    iconLinkName() {
      return encodeURI(this.cssClass);
    },
  }
}
</script>
