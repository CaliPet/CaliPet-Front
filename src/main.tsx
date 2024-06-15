import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "@/routes/home";
import { About } from "@/routes/about";
import { Blog } from "@/routes/blog";
import { Feed } from "@/routes/feed";
import { Contact } from "@/routes/contact";
import { Login } from "@/routes/login";
import { ErrorPage } from "@/routes/errorPage";
import { ContentFood } from "./routes/contentFood";
import { ContentBlog } from "./routes/contentBlog";
import App from "./app";
import "./global.css";
import '@/lib/i18n';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contentFood/:id",
        element: <ContentFood />,
      },
      {
        path: "/contentBlog/:id",
        element: <ContentBlog />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
