<template>
  <div>
    <span class="icon-32" :class="[cssClass]"></span>
  </div>
</template>
<style lang="scss">

.icon-32 {
  background-image: url('../../../src/minecraft-items-spritesheet.png');
  image-rendering: crisp-edges;
  display:inline-block;
  height:calc(32px / var(--n));
  width:calc(32px / var(--n));
  background-position:calc(var(--j)/var(--n) * 32px) calc(var(--i)/var(--n) * 32px);
  background-size:calc(1024px / var(--n)) calc(3648px / var(--n));
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
