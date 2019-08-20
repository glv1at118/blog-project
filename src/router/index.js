import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout";
import Editor from "../views/Editor";
import Read from "../views/Read";
import Tile from "../views/Tile"

Vue.use(VueRouter);

const routes = [
    {
        path: "/blog",
        component: Layout,
        children: [
            {
                path: "/blog/:count",
                component: Tile
            }
        ]
    },
    {
        path: "/editor",
        component: Editor
    },
    {
        path: "/read",
        component: Read
    },
    {
        path: "/*",
        redirect: "/blog/1"
    }
];

const router = new VueRouter({
    routes
});

export default router;