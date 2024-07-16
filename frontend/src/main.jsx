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

const hostUrl = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/reports",
        element: <Reports />,
        loader: () =>
          fetch(`${hostUrl}/api/reports`)
            .then((response) => response.json())
            .then((data) => data),
      },
      {
        path: "report-form",
        element: <ReportForm />,
        loader: async () => {
          const clientsPromise = fetch(`${hostUrl}/api/clients`).then((response) =>
            response.json(),
          );
          const sellersPromise = fetch(`${hostUrl}/api/sellers`).then((response) =>
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
          fetch(`${hostUrl}/api/reports/${params.id}`)
            .then((response) => response.json())
            .then((data) => data),
        action: updateReport,
      },
      {
        path: "/activity-monitoring",
        element: <ActivityMonitoring />,
        loader: () =>
          fetch(`${hostUrl}/api/reports`)
            .then((response) => response.json())
            .then((data) => data),
      },
      {
        path: "/reports/:id",
        element: <ReportDetails />,
        loader: async ({ params }) =>
          fetch(`${hostUrl}/api/reports/${params.id}`)
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
