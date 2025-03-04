import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("blog/blog-layout.tsx", [
        route("/blog", "routes/blog/blog.tsx"),
        route("/blog/trongate", "routes/blog/trongate.tsx"),
        route("/blog/trongate/mx-transition", "routes/blog/trongate/mx-transition.tsx"),
      ]),
] satisfies RouteConfig;
