<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
/* invoke the font styles, all sub-components will be able to use */
@font-face {
  font-family: "icomoon";
  src: url("./assets/fonts/icomoon.eot?e1k18k");
  src: url("./assets/fonts/icomoon.eot?e1k18k#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/icomoon.ttf?e1k18k") format("truetype"),
    url("./assets/fonts/icomoon.woff?e1k18k") format("woff"),
    url("./assets/fonts/icomoon.svg?e1k18k#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
</style>
