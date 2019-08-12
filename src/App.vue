<template>
  <div id="app">
    <Slider></Slider>
    <Pagination></Pagination>
    <Footer></Footer>
    <GoTop></GoTop>
    <AdminControl></AdminControl>
  </div>
</template>

<script>
import Slider from "./components/Slider";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import GoTop from "./components/GoTop";
import AdminControl from "./components/AdminControl";
export default {
  name: "app",
  components: {
    Slider,
    Pagination,
    Footer,
    GoTop,
    AdminControl
  }
};
</script>

<style>
#app {
  background-color: white;
  position: relative;
}
</style>
