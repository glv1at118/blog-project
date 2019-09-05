# blog-project

## Main Features

A blog page single page application project developed with Vue.js, Vue-Router, Vuex, with ES5/6, and vanilla CSS. Some main features of the application:

- Do searches based on article's title and article's customized tags.
- Free toggling of the administrator's editor mode and feasibility of adding/removing tags on both the editor's page and tile page.
- Reactive paginations and dynamic router. All the articles objects are stored in the vuex's state. The pagination box will adjust itself according to the total number of articles. Articles are split into 12 per page and dynamic routes will be allocated to each page.
- A slider component and a return-top component.
- Reader of the blog will be able to publish comment posts.
- Reader will be able to show and hide the comment list under a certain article.
- Share with social media's capability to adjust its position according to the scroll bar's position.
- A square-like "Metro-Style" is applied throughout the page application, making the app look neat.
- ... ...

Some snapshots of the page application:

![1](https://user-images.githubusercontent.com/44102726/64390839-6a214780-d014-11e9-8eb7-9d702c5a07e5.PNG)

------

![2](https://user-images.githubusercontent.com/44102726/64390842-6ee5fb80-d014-11e9-93fa-384553bb9aeb.PNG)

------

![3](https://user-images.githubusercontent.com/44102726/64390845-70afbf00-d014-11e9-82c4-f5bd99977111.PNG)

------

![4](https://user-images.githubusercontent.com/44102726/64390846-71e0ec00-d014-11e9-914a-4abef8b1a8a1.PNG)

------

![5](https://user-images.githubusercontent.com/44102726/64390920-b8cee180-d014-11e9-9b89-ad85090a89c0.PNG)

------

![6](https://user-images.githubusercontent.com/44102726/64390921-b8cee180-d014-11e9-9c64-4c44e5652c33.PNG)

------

![7](https://user-images.githubusercontent.com/44102726/64390922-b9677800-d014-11e9-841a-54833aabc81c.PNG)

------

![8](https://user-images.githubusercontent.com/44102726/64390923-b9677800-d014-11e9-983f-809952add8ed.PNG)

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

