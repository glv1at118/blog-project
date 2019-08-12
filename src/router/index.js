import Vue from "vue";
import VueRouter from "vue-router";
import Tile from "../views/Tile";

Vue.use(VueRouter);

const routes = [
    {
        path: "/:count",
        component: Tile
    },
    {
        path: "/",
        redirect: "/1"
    }
];

const router = new VueRouter({
    routes
});

export default router;