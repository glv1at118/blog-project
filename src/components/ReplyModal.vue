<template>
  <div id="replyModalContainer" v-show="showReplyModal" v-on:click.self="hideModal">
    <div id="replyModal">
      <textarea
        id="replyZone"
        name="userReply"
        placeholder="please leave a reply ..."
        cols="30"
        rows="10"
        v-model="textareaVal"
        ref="textarea"
      ></textarea>
      <button id="submit" v-on:click="submitReply">Submit The Reply</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ReplyModal",
  props: {
    _showReplyModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(["modalDataTemp"])
  },
  data() {
    return {
      textareaVal: "",
      showReplyModal: false
    };
  },
  watch: {
    _showReplyModal(nVal) {
      this.showReplyModal = nVal;
    },
    showReplyModal(nVal) {
      if (nVal) {
        setTimeout(() => {
          this.$refs.textarea.focus();
        }, 0);
      }
    }
  },
  methods: {
    submitReply() {
      if (this.textareaVal === "") {
        return;
      }
      this.$store.commit("addReplyItem", {
        essayTitle: this.modalDataTemp.essayTitle,
        index: this.modalDataTemp.index,
        comment: {
          readerName: "User Y",
          threadTime: this.getSystemTime(),
          content:
            "@" + this.modalDataTemp.replyToName + ": " + this.textareaVal,
          likes: 0,
          replies: 0,
          shares: 0
        }
      });

      this.$store.commit("increaseSum", {
        essayTitle: this.$route.params.essayTitle,
        index: this.modalDataTemp.index,
        category: "replies",
        subIndex: this.modalDataTemp.subIndex,
        deep: this.modalDataTemp.deepVal
      });

      this.textareaVal = "";
      this.showReplyModal = false;
      this.$emit("changeModalVal", false);
    },
    hideModal() {
      if (this.textareaVal !== "") {
        let decision = confirm(
          "All text will be discarded once the window is closed. Are you sure?"
        );
        if (decision) {
          this.showReplyModal = false;
          this.$emit("changeModalVal", false);
          this.textareaVal = "";
        }
      } else {
        this.showReplyModal = false;
        this.$emit("changeModalVal", false);
      }
    },
    getSystemTime() {
      let d = new Date();
      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let hour = d.getHours();
      let minute = d.getMinutes();
      let section = "";
      if (hour >= 0 && hour <= 11) {
        section = "AM";
      } else {
        section = "PM";
      }
      let mutatedHour = hour >= 0 && hour <= 11 ? hour : hour - 12;
      let mutatedMonth = "";
      switch (month) {
        case 1:
          mutatedMonth = "January";
          break;
        case 2:
          mutatedMonth = "February";
          break;
        case 3:
          mutatedMonth = "March";
          break;
        case 4:
          mutatedMonth = "April";
          break;
        case 5:
          mutatedMonth = "May";
          break;
        case 6:
          mutatedMonth = "June";
          break;
        case 7:
          mutatedMonth = "July";
          break;
        case 8:
          mutatedMonth = "August";
          break;
        case 9:
          mutatedMonth = "September";
          break;
        case 10:
          mutatedMonth = "October";
          break;
        case 11:
          mutatedMonth = "November";
          break;
        case 12:
          mutatedMonth = "December";
          break;
        default:
          break;
      }

      // i.e. August 01, 2019, 4:30PM
      let timeStr =
        mutatedMonth +
        " " +
        day +
        ", " +
        year +
        ", " +
        mutatedHour +
        ":" +
        minute +
        section;

      return timeStr;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 420px) {
  #replyModal {
    width: 90% !important;
    left: 5% !important;
    top: 10% !important;
  }
}
#replyModalContainer {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 100;
}
#replyModal {
  background-color: white;
  width: 60%;
  height: 400px;
  position: relative;
  left: 20%;
  top: 25%;
  box-sizing: border-box;
  padding: 20px;
}
#replyZone {
  width: 100%;
  height: 80%;
  resize: none;
  font-family: Quicksand;
  font-size: 24px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}
#replyZone:focus {
  border: 1px solid black;
  box-shadow: none;
}
#submit {
  background-color: #363e4f;
  color: white;
  border: none;
  margin-top: 2%;
  width: 100%;
  height: 15%;
  font-family: Quicksand;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
  transition-timing-function: ease-in-out;
  transition-property: all;
  transition-duration: 80ms;
}
#submit:hover {
  background-color: #0e71a3;
}
#submit:active {
  box-shadow: none;
}
</style>