<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>
          {{ icon.real_name }}
        </h1>
        <h4>Category: {{ icon.category_name }}</h4>
        <hr>
        <div class="preview-box border border-1 rounded border-info-subtle mb-3">
          <MinecraftIcon :icon="icon" :size="128" :hover="false" />
        </div>
        <div class="row">
          <div class="col-12 col-lg-8">
            <h2>Examples</h2>
            <hr>
            <div class="border rounded p-3 mb-3">
              <h2 class="d-flex align-items-center"><IconImage :icon="icon" class="me-2" :size="64" /> Heading</h2>
              <h3 class="d-flex align-items-center"><IconImage :icon="icon" class="me-2" /> Heading</h3>
              <h4 class="d-flex align-items-center"><IconImage :icon="icon" class="me-2" /> Heading</h4>
              <h5 class="d-flex align-items-center"><IconImage :icon="icon" class="me-2" :size="16" /> Heading</h5>
            </div>

            <div class="border rounded p-3 mb-3">
              <button class="btn btn-primary d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-danger d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-warning d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-info d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
            </div>

            <div class="border rounded p-3 mb-3">
              <button class="btn btn-outline-primary d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-outline-danger d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-outline-warning d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
              <button class="btn btn-outline-info d-inline-flex align-items-center me-3">
                <IconImage :icon="icon" class="me-2" /> Button
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="mb-4">
              <h3>Category</h3>
              {{ icon.category_name }} ({{ icon.category_id }})
            </div>
            <div class="mb-4">
              <h3>Real Name</h3>
              {{ icon.real_name }}
            </div>
            <div class="mb-4">
              <h3>Spritesheet Location</h3>
              Row {{ icon.row }}, Column {{ icon.column }}
            </div>
            <div class="mb-4">
              <h3>CSS Class</h3>
              <code>
                {{ "<div class='mc-icon " + icon.css_class + " icon-size-128'></div>" }}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import itemMap from '../../../data/wiki/itemMap.json'
import MinecraftIcon from '@/components/MinecraftIcon.vue'
import IconImage from '@/components/IconImage.vue'

export default {
  name: 'IconPreview',
  components: { IconImage, MinecraftIcon },
  data() {
    return {
      sizes: [16, 32, 64, 128, 256],
    }
  },
  mounted() {
    console.log('Opening view for ', this.$route.params.icon)
  },
  computed: {
    meta() {
      return itemMap.find((item) => item.cssClass === this.iconName)
    },
    icon() {
      return itemMap.find((item) => item.css_class === this.$route.params.icon)
    },
  },
}
</script>
