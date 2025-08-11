<template>
  <div id="icon-list-grid">
    <div class="icon-list-grid-header">
      <input
        type="text"
        placeholder="What icon are you looking for?"
        @input="search"
        v-model="form.text"
      />
    </div>

    <div class="icon-list-meta-nav">{{ Object.keys(icons).length }} icons</div>

    <div class="icon-list-grid-items">
      <MinecraftIcon v-for="(icon, key) in icons" :key="key" :icon-name="icon" />
    </div>
  </div>
</template>
<style lang="scss">
@import '../../../src/minecraft-items-spritesheet.css';

#icon-list-grid {
  display: grid;
  grid-template:
    'header'
    'meta'
    'main';
  height: 100vh;
  overflow: hidden;
  grid-template-rows: 60px 50px auto;

  .icon-list-meta-nav {
    display: flex;
    align-items: center;
    max-width: 1280px;
    justify-self: center;
    width: 100%;
    padding: 0 5rem;
  }

  .icon-list-grid-items {
    grid-area: main;
    overflow: hidden scroll;
    display: flex;
    flex-flow: row wrap;
    align-content: start;
    max-width: 1280px;
    justify-self: center;
    width: 100%;

    > a {
      //display: flex;
      padding: 1rem;

      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .icon-list-grid-header {
    grid-area: header;
    border-bottom: 1px solid #00bd7eff;

    input {
      height: 100%;
      width: 100%;
      background: transparent;
      border: 0;
      color: #ccc;
      padding: 1rem;

      &:focus {
        outline: none;
        border: none;
      }
    }
  }
}
</style>
<script>
import minecraftIcons from '../../../data/wiki/ids.json'
import MinecraftIcon from '@/components/MinecraftIcon.vue'
import { convertNameToCSS } from '@/helpers.js'

export default {
  name: 'IconList',
  components: { MinecraftIcon },
  data() {
    return {
      form: {
        text: '',
      },
    }
  },
  mounted() {
    this.form.text = this.$route.query.search
  },
  beforeRouteUpdate(to) {
    this.form.text = to.query.search
  },
  computed: {
    icons: function () {
      return Object.keys(minecraftIcons).filter((key) => {
        const css = convertNameToCSS(key)
        const query = this.form.text.toLowerCase()
        key = key.toLowerCase()

        return key.includes(query) || css.includes(query)
      })
    },
  },
  methods: {
    search() {
      this.$router.push({
        path: '/',
        query: {
          search: this.form.text,
        },
      })
    },
    searchData() {
      return this.$route.query.search
    },
  },
}
</script>
