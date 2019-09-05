<template>
  <div id="search">
    <div id="searchIcon" v-on:click="expandInputBar"></div>
    <input
      type="text"
      ref="word"
      v-on:blur="handleBlur"
      v-on:focus="toggleFocus"
      v-on:keyup.38="switchToTitle"
      v-on:keyup.40="switchToTag"
      v-on:input="uploadQueryWord"
      v-bind:class="[expand? 'input-active': '']"
      v-bind:placeholder="placeHolderText"
    />
    <div id="resultBox" v-show="display">
      <ul>
        <li v-for="essay in filteredEssays" v-bind:key="essay.essayTitle">
          <div class="titleBox">{{essay.essayTitle}}</div>
          <div class="briefBox">
            <a href="#">{{essay.aLinkText}}</a>
          </div>
          <div class="tagBox">
            <div v-for="tag in essay.tags" v-bind:key="tag">{{tag}}</div>
          </div>
        </li>
      </ul>
      <div id="noMatch" v-show="noMatch">No Matched Content</div>
    </div>
    <div id="arrowBox" v-show="display"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      expand: false,
      option: "title", // option can be "title" or "tag"
      isFocused: false,
      noMatch: false
    };
  },
  computed: {
    placeHolderText() {
      return this.option === "title"
        ? "search titles (arrow up/down)"
        : "search tags (arrow up/down)";
    },
    ...mapState(["queryWord"]),
    ...mapGetters(["filteredEssays"]),
    display() {
      if (!this.isFocused) {
        return false;
      }
      return this.queryWord.queryContent === "" ? false : true;
    }
  },
  methods: {
    expandInputBar() {
      this.expand = true;
      this.$refs.word.focus();
    },
    contractInputBar() {
      this.expand = false;
    },
    switchToTitle() {
      if (this.option === "title") {
        return;
      }
      this.$store.commit("changeQueryWord", {
        queryType: "title",
        queryContent: ""
      });
      this.option = "title";
    },
    switchToTag() {
      if (this.option === "tag") {
        return;
      }
      this.$store.commit("changeQueryWord", {
        queryType: "tag",
        queryContent: ""
      });
      this.option = "tag";
    },
    uploadQueryWord() {
      let wordVal = this.$refs.word.value;
      this.$store.commit("changeQueryWord", {
        queryType: this.option,
        queryContent: wordVal
      });
    },
    toggleFocus() {
      this.isFocused = !this.isFocused;
    },
    handleBlur() {
      this.contractInputBar();
      this.toggleFocus();
    }
  },
  watch: {
    filteredEssays(newVal) {
      if (newVal.length === 0) {
        this.noMatch = true;
      } else {
        this.noMatch = false;
      }
    }
  }
};
</script>

<style scoped>
#search {
  background-color: white;
  height: 30px;
  float: right;
  margin-top: 9px;
  margin-right: 20px;
  color: black;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#searchIcon {
  font-family: "icomoon";
  float: left;
  height: 30px;
  width: 30px;
  font-size: 20px;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
input {
  float: left;
  border: none;
  height: 30px;
  width: 0px;
  font-family: "Quicksand";
  font-size: 16px;
  line-height: 30px;
  padding-left: 5px;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
.input-active {
  width: 265px !important;
}
#resultBox {
  background-color: white;
  width: 300px;
  max-height: 376px;
  position: absolute;
  top: 40px;
  left: 0px;
  box-sizing: border-box;
  padding: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  font-family: "Quicksand";
  overflow-y: auto;
  overflow-x: hidden;
}
#noMatch {
  padding: 5px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  font-weight: bold;
}
#resultBox li {
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 5px;
}
#resultBox li a {
  color: black;
  font-style: oblique;
}
#resultBox li a:hover {
  color: #f15b24;
}
.titleBox {
  font-weight: bold;
  color: #363e4f;
  margin-bottom: 5px;
}
.briefBox {
  font-size: 14px;
  margin-bottom: 5px;
}
.tagBox {
  height: 20px;
  line-height: 20px;
  overflow: hidden;
}
.tagBox div {
  float: right;
  padding: 0 5px 0 5px;
  background-color: #0e71a3;
  color: white;
  margin-left: 5px;
  margin-bottom: 5px;
}
#arrowBox {
  width: 0px;
  height: 0px;
  border: 10px solid white;
  border-left-color: rgba(255, 255, 255, 0);
  border-right-color: rgba(255, 255, 255, 0);
  border-top-color: rgba(255, 255, 255, 0);
  position: absolute;
  top: 20px;
  left: 140px;
}
</style>