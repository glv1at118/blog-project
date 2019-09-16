<template>
  <div id="sliderContainer" v-on:mouseenter="pause" v-on:mouseleave="unpause">
    <ul id="slider" ref="slider">
      <!-- bind @click event callbacks to the "li" -->
      <li class="slide">
        <div class="shade">
          <h1>T1: A Discussion of The Theory of "Hello World"</h1>
          <br />
          <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        </div>
      </li>
      <li class="slide">
        <div class="shade">
          <h1>T2: A detailed analysis of Hello World Data Model</h1>
          <br />
          <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        </div>
      </li>
      <li class="slide">
        <div class="shade">
          <h1>T3: Hello World is An Old Proverb in the Programming World</h1>
          <br />
          <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        </div>
      </li>
      <li class="slide">
        <div class="shade">
          <h1>T1: A Discussion of The Theory of "Hello World"</h1>
          <br />
          <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        </div>
      </li>
    </ul>
    <div id="btn_previous" v-on:click="goPrevious"></div>
    <div id="btn_next" v-on:click="goNext"></div>
    <div id="pagination_box" ref="pagination_box">
      <ul>
        <li v-for="x in num" v-bind:key="x" v-bind:class="['dot', x===i? 'dot-active': '']"></li>
      </ul>
    </div>
    <div id="fastLinkBox">
      <div>
        <a href="#">FAST LINK 1</a>
      </div>
      <div>
        <a href="#">FAST LINK 2</a>
      </div>
      <div>
        <a href="#">FAST LINK 3</a>
      </div>
      <div>
        <a href="#">FAST LINK 4</a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * By default, the number of slides you want to display is 3. As shown in the above,
 * there are 4 "li" in the "ul". The first "li" is the same as the last "li", so as to fulfill
 * the seemless sliding purpose.
 *
 * Do not modify the "i" value in the data, as it is for the count purpose and should only
 * be modify by the program itself. When needing to add more slides to display, simply
 * clone the "li" structure above, and modify the "num" in the data. If there are 10 "li" in
 * the structure, then num should be nine, just like that.
 */
export default {
  name: "Slider",
  data() {
    return {
      // set a count used for iteration
      i: 1,
      // num is the number of different slides to be displayed
      num: 3,
      moveTimer: 0,
      waitTimer: 0,
      isRunning: false
    };
  },
  mounted() {
    this.move();
    this.isRunning = true;
    // resize event belongs to "window" only. So attach it in mounted
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("resize", this.adjustPagination);
    this.adjustPagination();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("resize", this.adjustPagination);
    // clear the timers before component is destroyed, to avoid "offsetLeft undefined" issues.
    clearInterval(this.moveTimer);
    clearInterval(this.waitTimer);
  },
  methods: {
    move() {
      this.waitTimer = setTimeout(() => {
        this.moveTimer = setInterval(() => {
          if (
            this.$refs.slider.offsetLeft >
            (-this.$refs.slider.clientWidth / 4) * this.i
          ) {
            this.$refs.slider.style.left =
              this.$refs.slider.offsetLeft -
              this.$refs.slider.clientWidth / 4 / 20 +
              "px";
          } else {
            this.$refs.slider.style.left =
              (-this.$refs.slider.clientWidth / 4) * this.i + "px";
            clearInterval(this.moveTimer);
            this.moveTimer = 0;
            if (this.i >= this.num) {
              this.i = 1;
              this.$refs.slider.style.left = 0 + "px";
            } else {
              this.i++;
            }
            this.waitTimer = 0;
            this.move();
          }
        }, 20);
      }, 4000);
    },
    pause() {
      // if the slide is moving now, then even if mouse enters, still does nothing
      if (this.moveTimer !== 0) {
        return;
      }
      // if the slide is waiting, then when the mouse enters, it pauses
      if (this.waitTimer !== 0 && this.moveTimer === 0) {
        clearInterval(this.waitTimer);
        this.waitTimer = 0;
        this.isRunning = false;
      }
    },
    unpause() {
      // if the slide is alreadying running, then no need to start another move();
      if (this.isRunning) {
        return;
      }
      this.move();
      this.isRunning = true;
    },
    goPrevious() {
      if (this.moveTimer !== 0) {
        return;
      }
      if (this.i <= 1) {
        this.$refs.slider.style.left =
          (-this.$refs.slider.clientWidth / 4) * (this.num - 1) + "px";
        this.i = this.num;
      } else {
        let oldLeft = this.$refs.slider.offsetLeft;
        this.$refs.slider.style.left =
          oldLeft + this.$refs.slider.clientWidth / 4 + "px";
        this.i--;
      }
    },
    goNext() {
      if (this.moveTimer !== 0) {
        return;
      }
      if (this.i >= this.num) {
        this.$refs.slider.style.left = 0 + "px";
        this.i = 1;
      } else {
        let oldLeft = this.$refs.slider.offsetLeft;
        this.$refs.slider.style.left =
          oldLeft - this.$refs.slider.clientWidth / 4 + "px";
        this.i++;
      }
    },
    handleResize() {
      // if it's sliding when the resize event happens, then do nothing.
      // No interference with async process since it may be buggy
      if (this.moveTimer !== 0) {
        return;
      }
      // else it is stopped and waiting, then you can do resize function to adjust
      // the left value of position
      let singleSlideWidth = this.$refs.slider.clientWidth / 4;
      this.$refs.slider.style.left = -singleSlideWidth * (this.i - 1) + "px";
    },
    adjustPagination() {
      let singleSlideWidth = this.$refs.slider.clientWidth / 4;
      let leftVal = (singleSlideWidth - 120) / 2;
      this.$refs.pagination_box.style.left = leftVal + "px";
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 840px) {
  .slide h1 {
    font-size: 40px !important;
  }
  .slide p {
    font-size: 20px !important;
  }
}
@media screen and (max-width: 420px) {
  #sliderContainer {
    display: none;
  }
}
#sliderContainer {
  width: 100%;
  height: 425px;
  font-family: Quicksand;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#slider {
  height: 390px;
  width: 400%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide {
  width: 25%;
  height: 100%;
  float: left;
  /* you can put here a background-image instead of background-color */
  background-color: #0e71a3;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
}
.slide .shade {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 390px;
  padding: 90px 130px 90px 130px;
  box-sizing: border-box;
}
.slide h1 {
  font-size: 48px;
}
.slide p {
  font-size: 28px;
}
#btn_previous,
#btn_next {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.2);
  width: 50px;
  height: 50px;
  font-size: 22px;
  text-align: center;
  line-height: 50px;
  top: 198px;
  cursor: pointer;
  user-select: none;
  /* border-radius: 50%; */
  font-family: "icomoon";
  transition-property: all;
  transition-duration: 100ms;
  transition-timing-function: ease-in-out;
}
#btn_previous {
  left: 40px;
}
#btn_next {
  right: 40px;
}
#btn_previous:hover,
#btn_next:hover {
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#pagination_box {
  position: absolute;
  top: 335px;
  width: 120px;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
}
.dot {
  background-color: rgba(0, 0, 0, 0.5);
  width: 12px;
  height: 12px;
  float: left;
  box-sizing: border-box;
  margin: 9px;
  /* border-radius: 50%; */
}
.dot-active {
  background-color: rgba(255, 255, 255) !important;
}
#fastLinkBox {
  width: 100%;
  height: 35px;
  position: absolute;
  left: 0px;
  bottom: 0px;
  padding-left: 130px;
  background-color: #363e4f;
  user-select: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
}
#fastLinkBox div {
  float: left;
  height: 30px;
  margin-top: 2.5px;
  line-height: 30px;
  margin-right: 20px;
  padding-left: 5px;
  padding-right: 5px;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: 2px solid #363e4f;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 150ms;
}
#fastLinkBox div:hover {
  border-bottom: 2px solid #f15b24;
}
#fastLinkBox div a {
  color: white;
}
#fastLinkBox div:hover a {
  color: #f15b24;
}
</style>
