<template>
  <div id="sliderContainer" v-on:mouseenter="pause" v-on:mouseleave="unpause">
    <ul id="slider" ref="slider">
      <li class="slide">
        <h1>T1: A Discussion of The Theory of "Hello World"</h1>
        <br />
        <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        <br />
        <div>
          <a href="#">Read more...</a>
        </div>
      </li>
      <li class="slide">
        <h1>T2: A detailed analysis of Hello World Data Model</h1>
        <br />
        <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        <br />
        <div>
          <a href="#">Read more...</a>
        </div>
      </li>
      <li class="slide">
        <h1>T3: Hello World is An Old Proverb in the Programming World</h1>
        <br />
        <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        <br />
        <div>
          <a href="#">Read more...</a>
        </div>
      </li>
      <li class="slide">
        <h1>T1: A Discussion of The Theory of "Hello World"</h1>
        <br />
        <p>Hello world is a very promising programming language in 2019, according to latest analysis</p>
        <br />
        <div>
          <a href="#">Read more...</a>
        </div>
      </li>
    </ul>
    <div id="btn_previous" v-on:click="goPrevious">&lt;</div>
    <div id="btn_next" v-on:click="goNext">&gt;</div>
    <div id="pagination_box" ref="pagination_box">{{i}} / {{num}}</div>
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
#sliderContainer {
  /* background-color: #f15b24; */
  width: 100%;
  height: 350px;
  font-family: Quicksand;
  color: white;
  position: relative;
  overflow: hidden;
}
#slider {
  height: 100%;
  width: 400%;
  position: absolute;
  top: 0;
  left: 0;
}
.slide {
  box-sizing: border-box;
  width: 25%;
  height: 100%;
  float: left;
  padding: 40px;
  background-image: url("../assets/slide.png");
  background-repeat: no-repeat;
  background-size: cover;
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
  background-color: rgba(255, 255, 255, 0.4);
  width: 30px;
  height: 48px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 42px;
  top: 176px;
  cursor: pointer;
  user-select: none;
}
#btn_previous {
  left: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
#btn_next {
  right: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
#btn_previous:hover,
#btn_next:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
#pagination_box {
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
}
a {
  color: white;
}
a:hover {
  text-decoration: underline;
}
</style>
