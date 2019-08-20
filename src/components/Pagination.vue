<template>
  <div id="pageLayout">
    <Search></Search>
    <router-view></router-view>
    <div id="pageBox">
      <div id="goHead" class="operatorBtn" v-on:click="goHead">&lt;&lt;</div>
      <div id="goPrev" class="operatorBtn" v-on:click="goPrev">&lt;</div>
      <div id="pageListFrame">
        <ul id="pageList" ref="pageList">
          <li
            v-for="x in pageNum"
            v-bind:key="x"
            v-on:click="goPage(x)"
            v-bind:class="['pageBtn', x === pageMark? 'pageBtn-active': '']"
          >{{x}}</li>
        </ul>
      </div>
      <div id="goTail" class="operatorBtn" v-on:click="goTail">&gt;&gt;</div>
      <div id="goNext" class="operatorBtn" v-on:click="goNext">&gt;</div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  name: "Pagination",
  components: {
    Search
  },
  data() {
    return {
      pageMark: 1
    };
  },
  mounted() {
    window.addEventListener("hashchange", this.updatePageMarkUponHashChange);
    // Use javascript to control the ul width to make it display in one-line,
    // and free of the restriction from the pageListFrame width.
    this.$refs.pageList.style.width = this.pageNum * 40 + "px";
  },
  beforeDestroy() {
    window.removeEventListener("hashchange", this.updatePageMarkUponHashChange);
  },
  computed: {
    pageNum() {
      // total number of essays in the state
      let essayTotal = this.$store.state.essays.length;
      // 12 essays/tiles per page, how many page:
      let pages = Math.ceil(essayTotal / 12);
      return pages;
    }
  },
  methods: {
    goHead() {
      if (this.pageMark === 1) {
        return;
      }
      this.$router.push(`/blog/1`);
      this.pageMark = 1;
      // move the pageList ul, default settings can display 4 paginations at maximum.
      if (this.pageNum <= 4) {
        return;
      }
      this.$refs.pageList.style.left = 0 + "px";
    },
    goPrev() {
      if (this.pageMark === 1) {
        return;
      }
      this.pageMark--;
      this.$router.push(`/blog/${this.pageMark}`);
      // move the pageList ul, default settings can display 4 paginations at maximum.
      if (this.pageNum <= 4) {
        return;
      }
      if (this.$refs.pageList.offsetLeft === 0) {
        return;
      }
      this.$refs.pageList.style.left =
        this.$refs.pageList.offsetLeft + 40 + "px";
    },
    goNext() {
      if (this.pageMark === this.pageNum) {
        return;
      }
      this.pageMark++;
      this.$router.push(`/blog/${this.pageMark}`);
      // move the pageList ul, default settings can display 4 paginations at maximum.
      if (this.pageNum <= 4) {
        return;
      }
      if (this.$refs.pageList.offsetLeft === -(this.pageNum - 4) * 40) {
        return;
      }
      this.$refs.pageList.style.left =
        this.$refs.pageList.offsetLeft - 40 + "px";
    },
    goTail() {
      if (this.pageMark === this.pageNum) {
        return;
      }
      this.$router.push(`/blog/${this.pageNum}`);
      this.pageMark = this.pageNum;
      // move the pageList ul, default settings can display 4 paginations at maximum.
      if (this.pageNum <= 4) {
        return;
      }
      this.$refs.pageList.style.left = -(this.pageNum - 4) * 40 + "px";
    },
    goPage(x) {
      if (this.pageMark === x) {
        return;
      }
      this.$router.push(`/blog/${x}`);
      this.pageMark = x;
    },
    updatePageMarkUponHashChange() {
      // when manually modify the url in the browser, updates the pageMark
      // location.hash i.e.:  #/blog/20
      this.pageMark = location.hash.substring(7);
    }
  }
};
</script>

<style scoped>
#pageLayout {
  padding-top: 10px;
  padding-bottom: 20px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
#pageBox {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  max-width: 360px;
  min-width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  font-size: 20px;
  font-family: Quicksand;
  border-radius: 10px;
  user-select: none;
}
#pageListFrame {
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  min-width: 40px;
  max-width: 160px;
  position: relative;
  overflow: hidden;
}
#pageList {
  height: 100%;
  position: relative;
  top: 0;
}
.operatorBtn {
  width: 40px;
  height: 100%;
  background-color: #0e71a3;
  border-radius: 25%;
  cursor: pointer;
  color: white;
}
.operatorBtn:hover {
  background-color: #42bae1;
}
#goHead,
#goPrev {
  float: left;
}
#goTail,
#goNext {
  float: right;
}
#goPrev,
#goNext {
  margin: 0 10px 0 10px;
}
.pageBtn {
  background-color: #363e4f;
  width: 40px;
  height: 100%;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  float: left;
  box-sizing: border-box;
  border: 2px solid white;
  line-height: 35px;
}
.pageBtn:hover {
  background-color: #f15b24;
}
.pageBtn-active {
  background-color: #f15b24 !important;
}
</style>
