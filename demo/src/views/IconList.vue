<template>
  <div id="icon-list-grid">
    <div class="icon-list-grid-header">
      <input
        type="text"
        placeholder="What icon are you looking for?"
        v-model="form.search"
        @input="pushHistory"
      />
    </div>

    <div class="icon-list-meta-nav">
      Showing {{ Object.keys(icons).length }} of {{ totalIconCount }} icons
    </div>

    <div class="icon-list-grid-nav">
      <ul class="list-group">
        <li @click="form.categories = []" class="list-group-item">Clear</li>
        <li v-for="(cat, key) in categories" :key="key" class="list-group-item">
          <input
            type="checkbox"
            name="filtered-categories"
            :value="cat"
            v-model="form.categories"
            :id="cat"
            class="me-1"
            @change="pushHistory"
          />
          <label class="form-check-label stretched-link" :for="cat">
            {{ key }}
          </label>
        </li>
      </ul>
    </div>

    <div class="icon-list-grid-items">
      <MinecraftIcon v-for="(icon, key) in icons" :key="key" :icon="icon" :size="64" />
    </div>
  </div>
</template>
<script>
import itemMap from '../../../data/wiki/itemMap.json'
import itemCategories from '../../../data/wiki/sections.json'
import MinecraftIcon from '@/components/MinecraftIcon.vue'

export default {
  name: 'IconList',
  components: { MinecraftIcon },
  data() {
    return {
      form: {
        search: '',
        categories: [],
      },
    }
  },
  mounted() {
    if (this.$route.query.search) this.form.search = this.$route.query.search

    if (this.$route.query.categories)
      this.form.categories = this.$route.query.categories.split('|').map((s) => Number(s))
  },
  beforeRouteUpdate(to) {
    if (to.query.search) this.form.search = to.query.search

    if (to.query.categories)
      this.form.categories = to.query.categories.split('|').map((s) => Number(s))
  },
  computed: {
    allIcons() {
      return itemMap
    },
    icons: function () {
      return this.allIcons.filter((item) => {
        const query = this.form.search.toLowerCase()

        if (this.form.categories.length > 0) {
          return (
            (item['css_class'].includes(query) || item['real_name'].includes(query)) &&
            this.form.categories.includes(Number(item['category_id']))
          )
        }

        return item['css_class'].includes(query) || item['real_name'].includes(query)
      })
    },
    categories() {
      return itemCategories
    },
    totalIconCount() {
      return Object.keys(itemMap).length
    },
    searchText() {
      return this.form.search
    },
    searchCategories() {
      return this.form.categories
    },
  },
  methods: {
    pushHistory() {
      const query = {}

      if (this.searchText.length > 0) query['search'] = this.searchText

      if (this.form.categories.length > 0) query['categories'] = this.form.categories.join('|')

      this.$router.push({
        path: '/',
        query: query,
      })
    },
  },
}
</script>
