<template>
  <div id="tileContainer">
    <ul id="tileList">
      <li
        class="tile"
        v-for="essay in essaysInGroup[$route.params.count-1]"
        v-bind:key="essay.essayTitle"
        v-on:mouseenter="handleMouseEnter(essay.essayTitle)"
        v-on:mouseleave="handleMouseLeave(essay.essayTitle)"
      >
        <div class="idBox">
          <div class="imgBox">
            <img v-bind:src="essay.headImgSrc" alt="img n.a." />
          </div>
          <div class="nameBox">{{essay.author}}</div>
          <div class="dateBox">
            {{essay.dateInfo}}
            <br />
            {{essay.essayLength}}
          </div>
        </div>
        <div class="thumbnailBox"></div>
        <div class="titleBox">
          {{essay.essayTitle}}
          <br />
          <router-link v-bind:to="`/read/${essay.essayTitle}`">{{essay.aLinkText}}</router-link>
        </div>
        <div class="tagBox">
          <div class="tagClass" v-for="tag in essay.tags" v-bind:key="tag">{{tag}}</div>
        </div>
        <div class="adminSection" v-show="essay.editorAreaShow">
          <div class="addTagArea">
            <input
              type="text"
              placeholder="add a new tag, hit enter..."
              v-model="localTagName"
              v-on:keyup.enter="addCustomTag(essay.essayTitle)"
            />
            <button v-on:click="addCustomTag(essay.essayTitle)">Submit Tag</button>
          </div>
          <div class="removeTagArea">
            <div
              class="tagClassAdmin"
              v-for="tag in essay.tags"
              v-bind:key="tag"
              v-on:click="removeTargetTag(essay.essayTitle, tag)"
            >{{tag}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Tile",
  computed: {
    ...mapGetters(["essaysInGroup"]),
    ...mapState(["isAuthorized", "editorMode"])
  },
  data() {
    return {
      localTagName: ""
    };
  },
  methods: {
    addCustomTag(targetEssayTitle) {
      this.$store.commit("addTag", {
        targetTitle: targetEssayTitle,
        newTag: this.localTagName
      });
      this.localTagName = "";
    },
    removeTargetTag(targetEssayTitle, tagName) {
      this.$store.commit("removeTag", {
        targetTitle: targetEssayTitle,
        tagToRemove: tagName
      });
    },
    handleMouseEnter(targetEssayTitle) {
      if (!this.isAuthorized) {
        return;
      } else {
        if (!this.editorMode) {
          return;
        } else {
          this.$store.commit("setEditorAreaTrue", targetEssayTitle);
        }
      }
    },
    handleMouseLeave(targetEssayTitle) {
      if (!this.isAuthorized) {
        return;
      } else {
        if (!this.editorMode) {
          return;
        } else {
          this.$store.commit("setEditorAreaFalse", targetEssayTitle);
        }
      }
    }
  }
};
</script>

<style scoped>
#tileContainer {
  width: 100%;
  position: relative;
}
#tileList {
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  font-family: Quicksand;
}
.tile {
  width: 400px;
  min-width: 400px;
  height: 300px;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  transition-duration: 100ms;
  transition-property: all;
  transition-timing-function: ease-in-out;
}
.tile:hover {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.4);
}
.idBox {
  height: 20%;
  width: 100%;
  position: absolute;
  top: 5%;
  left: 0px;
  color: white;
}
.imgBox {
  width: 20%;
  height: 100%;
  padding-top: 6px;
  padding-left: 6px;
  box-sizing: border-box;
  float: left;
}
.imgBox img {
  width: 52px;
  height: 52px;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
}
.nameBox {
  float: left;
  width: 40%;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  line-height: 65px;
  box-sizing: border-box;
  padding-left: 10px;
}
.dateBox {
  width: 40%;
  height: 100%;
  float: left;
  padding-right: 20px;
  padding-top: 15px;
  box-sizing: border-box;
  text-align: right;
  font-size: 14px;
}
.thumbnailBox {
  height: 100%;
  width: 100%;
  background-image: url("../assets/thumbnail.png");
  background-size: cover;
  background-repeat: no-repeat;
  transition-duration: 200ms;
  transition-property: all;
  transition-timing-function: ease-in;
}
.tile:hover .thumbnailBox {
  background-image: url("../assets/thumbnail2.png");
}
.titleBox {
  height: 10%;
  width: 100%;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  box-sizing: border-box;
  font-weight: bold;
  overflow: hidden;
  position: absolute;
  left: 0px;
  bottom: 20%;
  transition-duration: 200ms;
  transition-property: all;
  transition-timing-function: ease-in-out;
}
.titleBox a {
  font-weight: normal;
  font-size: 14px;
}
.tile:hover .titleBox {
  height: 35%;
  background-color: rgba(255, 255, 255, 0.3);
}
.tagBox {
  height: 10%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 4px;
  overflow: hidden;
  position: absolute;
  left: 0px;
  bottom: 2.5%;
}
.tagClass {
  float: right;
  padding: 0 5px 0 5px;
  height: 22px;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 4px;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
}
.adminSection {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.addTagArea {
  width: 100%;
  height: 50%;
  background-color: rgb(14, 113, 163, 0.7);
  position: relative;
}
.addTagArea input {
  outline: none;
  box-sizing: border-box;
  width: 90%;
  height: 50px;
  position: absolute;
  left: 5%;
  top: 30px;
  border-radius: 25px;
  border: 1px solid gray;
  font-size: 24px;
  padding-left: 20px;
}
.addTagArea button {
  outline: none;
  width: 50%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid gray;
  font-size: 20px;
  position: absolute;
  left: 25%;
  top: 95px;
  background-color: white;
  cursor: pointer;
}
.addTagArea button:hover {
  font-weight: bold;
}
.addTagArea button:active {
  background-color: #363e4f;
  color: white;
  font-weight: bold;
}
.removeTagArea {
  width: 100%;
  height: 50%;
  background-color: rgb(241, 91, 36, 0.7);
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  overflow: auto;
}
.tagClassAdmin {
  font-size: 20px;
  font-weight: bold;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: white;
  background-color: #363e4f;
  cursor: pointer;
  user-select: none;
}
.tagClassAdmin:hover {
  background-color: red;
}
</style>
