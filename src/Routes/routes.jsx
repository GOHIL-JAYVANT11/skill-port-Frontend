import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import { Dashboard } from "../Pages/Dashboard";
import { User } from "../Pages/User";
import JobsAndInternship from "../Pages/Jobs&Internship";
import Companies from "../Pages/Companies";
import Freelancer from "../Pages/Freelancer";
import Meeting from "../Pages/Meeting";
import Payments from "../Pages/Payments";
import Reports_Complaints from "../Pages/Reports_Complaints";

import Layout from "../Components/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/jobs-internship",
        element: <JobsAndInternship />,
      },
      {
        path: "/companies",
        element: <Companies />,
      },
      {
        path: "/freelancer",
        element: <Freelancer />,
      },
      {
        path: "/meeting",
        element: <Meeting />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/reports-complaints",
        element: <Reports_Complaints />,
      },
    ],
  },
]);
