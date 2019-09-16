<template>
  <div id="footerBar">
    <slot name="default">
      <!-- This is the default content in "Footer" component -->
      <div id="follow">Follow Us</div>
      <div id="icons">
        <span class="link">
          <a href="#"></a>
        </span>
        <span class="link">
          <a href="#"></a>
        </span>
        <span class="link">
          <a href="#"></a>
        </span>
        <span class="link">
          <a href="#"></a>
        </span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
#footerBar {
  width: 100%;
  height: 130px;
  background-color: #363e4f;
  padding-top: 10px;
  font-family: Quicksand;
  color: white;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#follow {
  width: 50%;
  height: 40px;
  position: relative;
  left: 25%;
  font-weight: bold;
  font-size: 38px;
  text-align: center;
  line-height: 50px;
}
#icons {
  position: relative;
  width: 30%;
  height: 50px;
  left: 35%;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.link a {
  color: #363e4f;
  font-family: "icomoon";
  font-size: 26px;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: white;
}
.link a:hover {
  color: #f15b24;
}
</style>
