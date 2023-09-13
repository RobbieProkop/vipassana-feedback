import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import FeedbackForm from "./pages/FeedbackForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFeedbackForm from "./pages/AdminFeedbackForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/feedback/:id" element={<FeedbackForm />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin/feedback" element={<AdminDashboard />} />
      <Route path="/admin/feedback/:id" element={<AdminFeedbackForm />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
