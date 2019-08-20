<template>
  <div id="layout">
    <Slider></Slider>
    <Pagination></Pagination>
    <Footer></Footer>
    <GoTop></GoTop>
    <AdminControl></AdminControl>
  </div>
</template>

<script>
import Slider from "../components/Slider";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import GoTop from "../components/GoTop";
import AdminControl from "../components/AdminControl";
export default {
  name: "Layout",
  components: {
    Slider,
    Pagination,
    Footer,
    GoTop,
    AdminControl
  }
};
</script>

<style scoped>
#layout {
  background-color: white;
  position: relative;
}
</style>