<template>
  <transition name="fade">
    <div id="goTop" v-on:click="returnPageTop" v-show="showGoTop"></div>
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
      if (scrollHeight === scrollTop + clientHeight) {
        // scroll bar has reached page bottom
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
#goTop {
  width: 40px;
  height: 40px;
  background-color: #0e71a3;
  position: fixed;
  bottom: 150px;
  right: 40px;
  text-align: center;
  line-height: 40px;
  font-family: "icomoon";
  font-size: 30px;
  color: white;
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
#goTop:hover {
  background-color: #363e4f;
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
