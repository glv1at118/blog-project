<template>
  <div
    id="adminControl"
    v-show="isAuthorized"
    v-on:click="toggleEditorMode"
  >Editor Mode: {{editorMode}}</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "AdminControl",
  computed: {
    ...mapState(["isAuthorized", "editorMode"])
  },
  methods: {
    ...mapMutations(["toggleEditorMode"])
  }
};
</script>

<style scoped>
#adminControl {
  width: 180px;
  height: 50px;
  background-color: rgb(54, 62, 79, 0.8);
  position: absolute;
  bottom: 140px;
  left: 5%;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  font-family: Quicksand;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
  user-select: none;
}
#adminControl:hover {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  background-color: rgb(82, 194, 184, 0.8);
}
#adminControl:active {
  background-color: rgb(241, 91, 36, 0.8);
}
</style>
