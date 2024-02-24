import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import ActivityDashboard from "@src/features/activities/dashboard/ActivityDashboard";
import ActivityForm from "@src/features/activities/form/ActivityForm";
import ActivityDetails from "@src/features/activities/details/ActivityDetails";
import NotFound from "@src/features/errors/NotFound";
import TestError from "@src/features/errors/TestError";
import ServerError from "@src/features/errors/ServerError";
import LoginForm from "@src/features/users/LoginForm";
import ProfilePage from "@src/features/profiles/ProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {element: <RequireAuth/>, children: [
        { path: "activities", element: <ActivityDashboard /> },
        { path: "activities/:id", element: <ActivityDetails /> },
        { path: "createActivity", element: <ActivityForm key={"create"} /> },
        { path: "manage/:id", element: <ActivityForm key={"manage"} /> },
        { path: "profiles/:username", element: <ProfilePage /> },
        { path: "errors", element: <TestError /> },
      ]},

      { path: "login", element: <LoginForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      // Everything else will be redirected to the NotFound page
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
