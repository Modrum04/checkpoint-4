import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import NavbarLayout from "./layout/NavbarLayout.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Reports from "./pages/Reports.jsx";
import ActivityMonitoring from "./pages/ActivityMonitoring.jsx";
import ReportForm, { addNewReport } from "./pages/ReportForm.jsx";
import ReportDetails, { deleteReport } from "./pages/ReportDetails.jsx";
import ReportEditForm, { updateReport } from "./pages/ReportEditForm.jsx";
import { login } from "./components/ConnectForm.jsx";
import Register, { postNewSeller } from "./pages/Register.jsx";

const hostUrl = import.meta.env.VITE_API_URL;

const requestHeader = () => {
  const token = sessionStorage.getItem("token");
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        action: login,
      },
      {
        path: "/register",
        element: <Register />,
        action: postNewSeller,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "report-form",
        element: <ReportForm />,
        loader: async () => {
          const clientsPromise = fetch(`${hostUrl}/api/clients`, requestHeader()).then((response) =>
            response.json(),
          );
          const sellersPromise = fetch(`${hostUrl}/api/sellers`, requestHeader()).then((response) =>
            response.json(),
          );
          const [clients, sellers] = await Promise.all([clientsPromise, sellersPromise]);
          return { clients, sellers };
        },
        action: addNewReport,
      },
      {
        path: "report-edit-form/:id",
        element: <ReportEditForm />,
        loader: ({ params }) =>
          fetch(`${hostUrl}/api/reports/${params.id}`, requestHeader())
            .then((response) => response.json())
            .then((data) => data),
        action: updateReport,
      },
      {
        path: "/activity-monitoring",
        element: <ActivityMonitoring />,
        loader: () =>
          fetch(`${hostUrl}/api/reports`, requestHeader())
            .then((response) => response.json())
            .then((data) => data),
      },
      {
        path: "/reports/:id",
        element: <ReportDetails />,
        loader: async ({ params }) =>
          fetch(`${hostUrl}/api/reports/${params.id}`, requestHeader())
            .then((response) => response.json())
            .then((data) => data),
        action: deleteReport,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
