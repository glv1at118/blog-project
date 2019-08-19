<template>
  <div id="search">
    <input
      type="text"
      v-bind:placeholder="placeHolderText"
      v-on:input="uploadQueryWord"
      ref="word"
      v-on:focus="toggleFocus"
      v-on:blur="toggleFocus"
    />
    <div
      id="searchTagBtn"
      v-on:click="switchToTag"
      v-bind:class="[option==='tag'?'optionActive':'']"
    >Tag</div>
    <div
      id="searchTitleBtn"
      v-on:click="switchToTitle"
      v-bind:class="[option==='title'?'optionActive':'']"
    >Title</div>
    <div id="resultBox" v-show="display">
      <ul id="resultList" ref="resultList">
        <li class="result" v-for="essay in filteredEssays" v-bind:key="essay.essayTitle">
          <div class="container1">
            <div class="nameBox">{{essay.author}}</div>
            <div class="dateBox">{{essay.dateInfo}}</div>
          </div>
          <div class="container2">
            <div class="titleBox">
              <a href="#">{{essay.essayTitle}}</a>
            </div>
            <div class="tagBox">
              <div class="tagLabel" v-for="tag in essay.tags" v-bind:key="tag">{{tag}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      option: "title", // option can either be "title" or "tag", default is "title"
      isFocused: false
    };
  },
  computed: {
    placeHolderText() {
      return this.option === "title"
        ? "search blog by article titles..."
        : "search blog by article tags...";
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
    // this method sets the border bottom left and right radius of the input element
    setInputBorderStyle(radius) {
      this.$refs.word.style.borderBottomLeftRadius = radius + "px";
      this.$refs.word.style.borderBottomRightRadius = radius + "px";
    },
    toggleFocus() {
      this.isFocused = !this.isFocused;
      if (!this.isFocused) {
        this.setInputBorderStyle(25);
      } else {
        if (this.queryWord.queryContent === "") {
          this.setInputBorderStyle(25);
        } else {
          this.setInputBorderStyle(0);
        }
      }
    }
  },
  watch: {
    // deep watch on the query content. Based on this and set the input border bottom styles
    queryWord: {
      handler(newVal) {
        if (newVal.queryContent === "") {
          this.setInputBorderStyle(25);
        } else {
          this.setInputBorderStyle(0);
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#search {
  font-family: Quicksand;
  width: 90%;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 10px;
  position: relative;
}
input {
  outline: none;
  height: 100%;
  float: left;
  box-sizing: border-box;
  width: 70%;
  font-size: 24px;
  padding-left: 20px;
  border: 1px solid gray;
  border-radius: 25px;
}
input:focus {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
}
div #searchTitleBtn,
div #searchTagBtn {
  float: right;
  width: 10%;
  height: 100%;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
}
#searchTitleBtn {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  margin-right: 1px;
  background-color: #999999;
  box-sizing: border-box;
}
#searchTitleBtn:hover {
  background-color: #f15b24;
  color: white;
}
#searchTitleBtn:active {
  background-color: #363e4f;
  color: white;
}
#searchTagBtn {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  margin-left: 1px;
  background-color: #999999;
  box-sizing: border-box;
}
#searchTagBtn:hover {
  background-color: #f15b24;
  color: white;
}
#searchTagBtn:active {
  background-color: #363e4f;
  color: white;
}
.optionActive {
  background-color: #363e4f !important;
  color: white !important;
  border: 2px solid #f15b24;
}
#resultBox {
  position: absolute;
  width: 70%;
  max-height: 400px;
  left: 0;
  top: 50px;
  box-sizing: border-box;
  border: 1px solid gray;
  border-top: none;
  z-index: 20;
  overflow: auto;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: white;
  text-align: center;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:active {
  background-color: #808080;
}
#resultList {
  width: 100%;
  padding: 2px;
  box-sizing: border-box;
}
.result {
  width: 100%;
  height: 100px;
  position: relative;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid gray;
}
.container1 {
  height: 100%;
  width: 25%;
  float: left;
}
.container1 .nameBox {
  background-color: #363e4f;
  width: 100%;
  height: 70%;
  font-weight: bold;
  font-size: 20px;
  line-height: 70px;
  color: white;
  box-sizing: border-box;
}
.container1 .dateBox {
  background-color: #d1d6e0;
  width: 100%;
  height: 30%;
  line-height: 30px;
  box-sizing: border-box;
  margin-right: 1px;
  font-weight: bold;
}
.container2 {
  height: 100%;
  width: 75%;
  float: left;
}
.container2 .titleBox {
  background-color: #363e4f;
  width: 100%;
  height: 70%;
  font-size: 18px;
  line-height: 20px;
  font-weight: bold;
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 10px;
  overflow: auto;
  color: white;
  margin-left: 1px;
}
.container2 .titleBox a {
  color: white;
}
.container2 .titleBox a:hover {
  color: #f15b24;
  text-decoration: underline;
}
.container2 .tagBox {
  background-color: #d1d6e0;
  width: 100%;
  height: 30%;
  box-sizing: border-box;
  margin-left: 1px;
}
.container2 .tagBox .tagLabel {
  background-color: #0e71a3;
  float: right;
  height: 26px;
  padding: 0 5px 0 5px;
  line-height: 30px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 2px;
  border-radius: 10px;
  color: white;
}
</style>
