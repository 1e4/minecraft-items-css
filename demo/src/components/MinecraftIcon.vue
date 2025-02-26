<template>
  <div class="item" @click="copyToClipboard(cssClass)" @mouseenter="openCard"
       @mouseleave="closeCard">
    <span class="icon-32" :class="[cssClass]"></span>

    <div v-if="card.open" class="card-popup">
      <p>{{ iconName }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.item {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;

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

.icon-32 {
  background-image: url('../../../src/minecraft-items-spritesheet.png');
  image-rendering: crisp-edges;
  display: inline-block;
  height: calc(32px / var(--n));
  width: calc(32px / var(--n));
  background-position: calc(var(--j) / var(--n) * 32px) calc(var(--i) / var(--n) * 32px);
  background-size: calc(1024px / var(--n)) calc(3648px / var(--n));
}

</style>
<script>
export default {
  name: 'MinecraftIcon',
  props: {
    iconName: {
      type: String,
      required: true,
    },
    icon: {
      type: Object,
      required: true,
    },
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
      return this.iconName
        .toLowerCase()
        .split(' ')
        .join('-')
        .replace("'", '')
        .replace("(", '')
        .replace(")", '')
        .replace(".", '');
    }
  }
}
</script>
