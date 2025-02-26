<template>
  <div id="icon-list-grid">
    <div class="icon-list-grid-header">
      <input type="text" placeholder="What do you want to search for?" v-model="form.text">
    </div>

    <div class="icon-list-meta-nav">
      {{ Object.keys(icons).length }} icon results
    </div>

    <div class="icon-list-grid-items">
      <MinecraftIcon v-for="(icon, key) in icons" :key="icon" :icon="icon" :icon-name="key"/>
    </div>
  </div>
</template>
<style lang="scss">
@import "../../../src/minecraft-items-spritesheet.css";

#icon-list-grid {
  display: grid;
  grid-template: "header"
  "meta"
"main";
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

    > div {
      //display: flex;
      padding: 1rem;

      &:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }

  .icon-list-grid-header {
    grid-area: header;
    border-bottom: 1px solid #00BD7EFF;

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
import icons from "../../../data/wiki/ids.json"
import MinecraftIcon from "@/components/MinecraftIcon.vue";

export default {
  name: "IconList",
  components: {MinecraftIcon},
  data() {
    return {
      form: {
        text: ''
      }
    }
  },
  computed: {
    icons: function () {
      return Object.fromEntries(
        Object.entries(icons).filter(([key]) => {
          const query = this.form.text.toLowerCase();

          const cssClass =
            query.split(' ')
              .join('-')
              .replace("'", '')
              .replace("(", '')
              .replace(")", '')
              .replace(".", '');

          const fCssClass =
            key.toLowerCase()
              .split(' ')
              .join('-')
              .replace("'", '')
              .replace("(", '')
              .replace(")", '')
              .replace(".", '');

          if (key.includes('Acacia Boat with Chest')) {

            console.log(
              'Trying',
              cssClass,
              fCssClass,
              query,
              key
            )
          }

          return key.toLowerCase().includes(query) || key.includes(cssClass) || fCssClass.includes(cssClass);
        })
      )
    }
  }
}
</script>
