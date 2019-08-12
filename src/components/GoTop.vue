<template>
  <div id="goTop" v-on:click="returnPageTop">Top</div>
</template>

<script>
export default {
  name: "GoTop",
  methods: {
    returnPageTop() {
      let timer = undefined;
      timer = setInterval(() => {
        if (document.documentElement.scrollTop === 0) {
          clearInterval(timer);
          return;
        }
        document.documentElement.scrollTop -= 150;
      }, 20);
    }
  }
};
</script>

<style scoped>
#goTop {
  width: 70px;
  height: 50px;
  background-color: rgb(54, 62, 79, 0.8);
  position: absolute;
  bottom: 140px;
  right: 5%;
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
#goTop:hover {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  background-color: rgb(82, 194, 184, 0.8);
}
#goTop:active {
  background-color: rgb(241, 91, 36, 0.8);
}
</style>
