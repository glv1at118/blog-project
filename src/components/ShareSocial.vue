<template>
  <section id="shareSocial" v-bind:class="[limitReached?'shareSocial-active':'']">
    <div class="icon" title="share on facebook"></div>
    <div class="icon" title="share on twitter"></div>
    <div class="icon" title="share on google+"></div>
    <div class="icon" title="share on linkedIn"></div>
  </section>
</template>

<script>
export default {
  name: "ShareSocial",
  data() {
    return {
      limitReached: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 400) {
        this.limitReached = true;
      } else {
        this.limitReached = false;
      }
    }
  }
};
</script>

<style scoped>
#shareSocial {
  width: 50px;
  height: 240px;
  position: fixed;
  bottom: 20px;
  left: 30px;
  z-index: 100;
  transition-property: all;
  transition-duration: 700ms;
  transition-timing-function: ease-in-out;
}
.shareSocial-active {
  bottom: 350px !important;
}
#shareSocial .icon {
  font-family: "icomoon";
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  font-size: 30px;
  line-height: 50px;
  text-align: center;
  color: #363e4f;
  /* border-radius: 50%; */
  cursor: pointer;
  user-select: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}
#shareSocial .icon:hover {
  font-size: 34px;
  color: #0e71a3;
}
#shareSocial .icon:active {
  font-size: 34px;
  color: #f15b24;
}
</style>