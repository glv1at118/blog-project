<template>
  <div id="footerBar">
    <div id="follow">Follow Us:</div>
    <div id="icons">
      <span class="link">
        <a href="#">Twitter</a>
      </span>
      <span class="link">
        <a href="#">Facebook</a>
      </span>
      <span class="link">
        <a href="#">Linkedin</a>
      </span>
      <span class="link">
        <a href="#">Instagram</a>
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
  padding-top: 30px;
  font-family: Quicksand;
  color: white;
  box-sizing: border-box;
}
#follow {
  width: 20%;
  height: 40px;
  position: relative;
  left: 40%;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  line-height: 50px;
}
#icons {
  position: relative;
  width: 40%;
  height: 50px;
  left: 30%;
  text-align: center;
  font-size: 22px;
  line-height: 50px;
}
#icons .link:nth-child(2) {
  margin-left: 10px;
  margin-right: 5px;
}
#icons .link:nth-child(3) {
  margin-left: 5px;
  margin-right: 10px;
}
.link a {
  color: white;
}
.link a:hover {
  color: #f15b24;
  text-decoration: underline;
}
</style>
