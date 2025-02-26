<template>
  <div id="icon-list-grid">
    <div class="icon-list-grid-header">
      <input type="text" placeholder="What do you want to search for?" v-model="form.text">
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
"main";
  height: 100vh;
  overflow: hidden;
  grid-template-rows: 40px auto;

  .icon-list-grid-items {
    grid-area: main;
    overflow: scroll;
    display: flex;
    flex-flow: row wrap;
    align-content: start;

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
        text: 'dia'
      }
    }
  },
  computed: {
    icons: function () {
      return Object.fromEntries(
        Object.entries(icons).filter(([key]) => {

          return key.toLowerCase()
            .includes(this.form.text.toLowerCase());
        })
      )

    }
  }
}
</script>
