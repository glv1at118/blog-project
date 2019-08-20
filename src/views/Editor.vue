<template>
  <div>
    <div id="toolbar-container">
      <!-- code below is to set drop-downs for font family. Source[Official Doc Playground] -->
      <select class="ql-font">
        <option selected>Sans Serif</option>
        <option value="quicksand">Quicksand</option>
        <option value="times">Times</option>
      </select>
      <select class="ql-size">
        <option selected>12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="22px">22px</option>
        <option value="24px">24px</option>
        <option value="26px">26px</option>
        <option value="28px">28px</option>
      </select>
      <select class="ql-header">
        <option selected></option>
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
      </select>
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-blockquote"></button>
      <select class="ql-align">
        <option selected></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
      <button class="ql-link"></button>
      <button class="ql-image"></button>
      <button class="ql-video"></button>
      <button class="ql-undo">
        <svg viewBox="0 0 18 18">
          <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
          <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
        </svg>
      </button>
      <button class="ql-redo">
        <svg viewBox="0 0 18 18">
          <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
          <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
        </svg>
      </button>
      <button v-on:click="addHr">
        <b id="hr">HR</b>
      </button>
    </div>

    <div ref="workarea" id="workarea"></div>

    <button v-on:click="uploadDoc()" class="custom_btn">upload doc to backend</button>
    <button v-on:click="saveToDataAsTemp()" class="custom_btn">save doc to local</button>
    <button v-on:click="retriveFromData()" class="custom_btn">retrive last saved from local</button>
    <button v-on:click="addTag()" class="custom_btn">add a tag</button>
    <button v-on:click="deleteTag()" class="custom_btn">delete a tag</button>
    <div id="tagDisplayArea">Tags: {{tagArray}}</div>
  </div>
</template>


<script>
import Quill from "quill";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "@taoqf/quill-image-resize-module";

// code below is adapted from official doc solution
let BlockEmbed = Quill.import("blots/block/embed");
class DividerBlot extends BlockEmbed {}
DividerBlot.blotName = "divider";
DividerBlot.tagName = "hr";

// code below is to set font family. [Source: Official Doc Playground]
let Font = Quill.import("formats/font");
Font.whitelist = ["quicksand", "times"];

// code below is to set font size in numbers.
let Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "26px",
  "28px"
];

Quill.register(Font, true);
Quill.register(Size, true);
Quill.register(DividerBlot);
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "Editor",
  data: function() {
    return {
      quillInstance: null,
      tempDoc: "",
      tagArray: []
    };
  },
  mounted: function() {
    let quill = new Quill(this.$refs.workarea, {
      theme: "snow",
      modules: {
        toolbar: {
          container: "#toolbar-container",
          handlers: {
            redo: function() {
              this.quill.history.redo();
            },
            undo: function() {
              this.quill.history.undo();
            }
          }
        },
        imageDrop: true,
        history: {
          delay: 1000,
          maxStack: 100,
          userOnly: false
        },
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"]
        }
      }
    });
    this.quillInstance = quill;
  },
  methods: {
    // addHr method is adapted from official document's solution
    addHr: function() {
      let range = this.quillInstance.getSelection(true);
      this.quillInstance.insertText(range.index, "\n", Quill.sources.USER);
      this.quillInstance.insertEmbed(
        range.index + 1,
        "divider",
        true,
        Quill.sources.USER
      );
      this.quillInstance.setSelection(range.index + 2, Quill.sources.SILENT);
    },
    uploadDoc: function() {
      // [IMPORTANT NOTE: Server backend should inject the "tagArray" into the article object list]
      alert(
        "message from server: Article uploaded: " +
          this.tempDoc +
          "\n\nmessage from server: Article tags uploaded: " +
          this.tagArray
      );
    },
    saveToDataAsTemp: function() {
      this.tempDoc = this.$refs.workarea.children[0].innerHTML;
    },
    retriveFromData: function() {
      this.$refs.workarea.children[0].innerHTML = this.tempDoc;
    },
    addTag: function() {
      let newTag = prompt("please add a custom tag").trim();
      if (newTag === "") {
        return;
      }
      for (let i = 0; i < this.tagArray.length; i++) {
        if (newTag.toUpperCase() === this.tagArray[i].toUpperCase()) {
          return;
        }
      }
      this.tagArray.push(newTag);
    },
    deleteTag: function() {
      let targetTag = prompt("type the tag you want to delete").trim();
      let positionIndex = this.tagArray.indexOf(targetTag);
      if (positionIndex === -1) {
        return;
      }
      this.tagArray.splice(positionIndex, 1);
    }
  }
};
</script>


<style>
@import "../../node_modules/quill/dist/quill.core.css";
@import "../../node_modules/quill/dist/quill.snow.css";
@import "../../node_modules/quill/dist/quill.bubble.css";

.custom_btn {
  float: left;
  width: 20%;
}
#tagDisplayArea {
  width: 96%;
  height: 100px;
  margin-top: 30px;
  margin-left: 2%;
  margin-right: 2%;
  border: 2px solid gray;
  background-color: black;
  color: white;
  box-sizing: border-box;
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: bold;
  font-size: 20px;
  overflow: auto;
}
#workarea .ql-editor {
  min-height: 400px;
  height: 550px;
  overflow-y: scroll;
  border: 2px solid gray;
  box-sizing: border-box;
}

/* Code below is to set drop-down list font family. Source: [Official Doc Playground] */
#toolbar-container .ql-font span[data-label="Sans Serif"]::before {
  font-family: "Sans Serif";
}

#toolbar-container .ql-font span[data-label="Quicksand"]::before {
  font-family: "Quicksand";
}

#toolbar-container .ql-font span[data-label="Times"]::before {
  font-family: "Times";
}
/* Code below is to set edit content's font family. Source: [Official Doc Playground] */
.ql-font-quicksand {
  font-family: "Quicksand";
}

.ql-font-times {
  font-family: "Times";
}

/* code below is to set font-size in specific numbers */
.ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  font-size: 14px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  font-size: 16px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  font-size: 18px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  font-size: 20px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="22px"]::before {
  font-size: 22px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  font-size: 24px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="26px"]::before {
  font-size: 26px !important;
}

.ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  font-size: 28px !important;
}
</style>


