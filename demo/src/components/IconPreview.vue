<template>
  <div>
    Sidebar

    {{ iconName }}
    <MinecraftIcon :icon-name="iconName" :size="256" />
    <MinecraftIcon :icon-name="iconName" :size="128" />
    <MinecraftIcon :icon-name="iconName" :size="64" />
    <MinecraftIcon :icon-name="iconName" :size="32" />
    <MinecraftIcon :icon-name="iconName" :size="16" />
  </div>
</template>
<script>
import { convertNameToCSS } from '@/helpers.js'
import MinecraftIcon from '@/components/MinecraftIcon.vue'

export default {
  name: 'IconPreview',
  components: { MinecraftIcon },
  mounted() {
    console.log("Opening view for ", this.$route.params.icon)
  },
  computed: {
    iconName() {
      const decodedName = decodeURI(this.$route.params.icon)

      return convertNameToCSS(decodedName)
    }
  }
}
</script>
