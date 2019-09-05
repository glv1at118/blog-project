<template>
  <div id="layout">
    <Navigation>
      <Search></Search>
    </Navigation>
    <Slider></Slider>
    <Pagination></Pagination>
    <Footer></Footer>
    <GoTop></GoTop>
    <AdminControl></AdminControl>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Slider from "../components/Slider";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import GoTop from "../components/GoTop";
import AdminControl from "../components/AdminControl";
import Search from "../components/Search";
export default {
  name: "Layout",
  components: {
    Slider,
    Pagination,
    Footer,
    GoTop,
    AdminControl,
    Navigation,
    Search
  }
};
</script>

<style scoped>
#layout {
  background-color: white;
  position: relative;
}
</style>