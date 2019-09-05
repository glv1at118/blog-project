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
  src: url("./assets/fonts/icomoon.eot?v5abi8");
  src: url("./assets/fonts/icomoon.eot?v5abi8#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/icomoon.ttf?v5abi8") format("truetype"),
    url("./assets/fonts/icomoon.woff?v5abi8") format("woff"),
    url("./assets/fonts/icomoon.svg?v5abi8#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
</style>
