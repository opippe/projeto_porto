
import { createMemoryRouter } from "react-router-dom";
import App from "./App.jsx";

import ErrorPage from "../error-page.jsx";
import PageRoutes from "./PageRoutes.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

function Routes() {
  return createMemoryRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
        {
          path: "/atraqui",
          element: <PageRoutes />,
        },
      ],
    },
  ]);
}

export default Routes;
