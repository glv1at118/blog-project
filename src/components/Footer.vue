<template>
  <div id="footerBar">
    <div id="follow">Follow Us:</div>
    <div id="icons">
      <span class="link">
        <a href="#"></a>
      </span>
      <span class="link">
        <a href="#"></a>
      </span>
      <span class="link">
        <a href="#"></a>
      </span>
      <span class="link">
        <a href="#"></a>
      </span>
    </div>
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
  padding-top: 15px;
  font-family: Quicksand;
  color: white;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#follow {
  width: 20%;
  height: 40px;
  position: relative;
  left: 40%;
  font-weight: bold;
  font-size: 30px;
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
  margin-top: 10px;
}
.link a {
  color: white;
  font-family: "icomoon";
  font-size: 24px;
}
.link a:hover {
  color: #f15b24;
}
</style>
