const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/FullTable", component: () => import("pages/FullTable.vue") },
      { path: "/News", component: () => import("pages/News.vue") },
      {
        path: "/PdfReader/:link",
        component: () => import("pages/PdfReader.vue")
      },
      { path: "/Settings", component: () => import("pages/Settings.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
