<template>
  <transition name="fade">
    <div id="goTop" v-on:click="returnPageTop" v-show="showGoTop"></div>
  </transition>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      showGoTop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
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
    },
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight;
      let clientHeight = document.documentElement.clientHeight;
      if (
        scrollTop + clientHeight >= scrollHeight - 100 &&
        scrollTop + clientHeight <= scrollHeight + 5
      ) {
        // scroll bar has reached "close" to page bottom
        // this is to control the javascript calculation imprecision problem
        // rather than using "scrollTop + clientHeight === scrollHeight" condition
        this.showGoTop = true;
      } else {
        this.showGoTop = false;
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../assets/fonts/icomoon.eot?5l87r7");
  src: url("../assets/fonts/icomoon.eot?5l87r7#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/icomoon.ttf?5l87r7") format("truetype"),
    url("../assets/fonts/icomoon.woff?5l87r7") format("woff"),
    url("../assets/fonts/icomoon.svg?5l87r7#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
@media screen and (max-width: 420px) {
  #goTop {
    display: none;
  }
}
#goTop {
  width: 40px;
  height: 40px;
  background-color: rgb(14, 113, 163, 0.5);
  position: fixed;
  bottom: 150px;
  right: 40px;
  text-align: center;
  line-height: 40px;
  font-family: "icomoon";
  font-size: 20px;
  color: white;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
#goTop:hover {
  background-color: rgb(54, 62, 79, 0.5);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
