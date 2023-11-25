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
import Thankyou from "./pages/thankyou";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import DeleteConfirm from "./pages/DeleteConfirm.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/feedback/thankyou" element={<Thankyou />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feedbackDashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/deleteUser/:id" element={<DeleteConfirm />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
