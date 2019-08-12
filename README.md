# blog-project

## Features and notes

A blog page single page application project developed with Vue.js, Vue-Router, Vuex, with ES5/6, and vanilla CSS. Some main features of the application:

- Do searches based on article's title and article's customized tags.
- Free toggling of the administrator's editor mode and feasibility of adding/removing tags.
- Reactive paginations and dynamic router. All the articles objects are stored in the vuex's state. The pagination box will adjust itself according to the total number of articles. Articles are split into 12 per page and dynamic routes will be allocated to each page.
- A slider component and a return-top component.

Some snapshots of the page application:

![1565623798173](C:\Users\User\AppData\Roaming\Typora\typora-user-images\1565623798173.png)



![1565623841730](C:\Users\User\AppData\Roaming\Typora\typora-user-images\1565623841730.png)



![1565624016077](C:\Users\User\AppData\Roaming\Typora\typora-user-images\1565624016077.png)



![1565624094476](C:\Users\User\AppData\Roaming\Typora\typora-user-images\1565624094476.png)

Extra stuffs to deal with:

- A more responsive page layout and a mobile-end page when needed



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

