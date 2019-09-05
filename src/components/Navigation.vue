<template>
  <header v-bind:class="[showHeader?'':'header-active']">
    <slot name="default">DEFAULT CONTENT: I AM A NAVIGATION AREA, MY HEIGHT IS 48PX. I HAVE A SLOT.</slot>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      showHeader: true,
      scrollTopPrevious: 0
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
      if (scrollTop > this.scrollTopPrevious && scrollTop > 48) {
        // scrolling downward
        this.showHeader = false;
      } else {
        // staying still or scrolling upward
        this.showHeader = true;
      }
      this.scrollTopPrevious = scrollTop;
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  background-color: #363e4f;
  opacity: 0.9;
  height: 48px;
  color: white;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 100;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  transition-property: all;
  transition-duration: 500ms;
  transition-timing-function: ease-in-out;
}
.header-active {
  top: -48px !important;
}
</style>