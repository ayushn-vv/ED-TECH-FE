/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import paths, { rootPaths } from "./paths";

import MainLayout from "layouts/main-layout";
import UserLayout from "../layouts/Layout-user";
import AuthLayout from "layouts/auth-layout";

import Splash from "components/loader/Splash";
import PageLoader from "components/loader/PageLoader";

import ProtectedRoute from "./protectedRoute";
import AuthRedirect from "./authRedirect";

// --------------------
// Lazy Pages
// --------------------
const App = lazy(() => import("App"));
const Dashboard = lazy(() => import("pages/dashboard"));
const UsersDashboard = lazy(() => import("../pages/dashboard-user"));
const Courses = lazy(() => import("../pages/Courses/index"));
const Enrollment = lazy(() => import("../pages/Enrollment"));
const Contents = lazy(() => import("../pages/Content"));
const CourseById = lazy(
  () => import("../pages/Courses/instructor/feat/courseById")
);
const UserMan = lazy(() => import("../pages/Users"));
const Coursez = lazy(() => import("../pages/user-page/Course"));
const Signin = lazy(() => import("pages/authentication/Signin"));
const Signup = lazy(() => import("pages/authentication/Signup"));
const Unauthorized = lazy(() => import("pages/Unauthorized"));

// --------------------
// Router
// --------------------
const router = createBrowserRouter(
  [
    {
      element: (
        <Suspense fallback={<Splash />}>
          <App />
        </Suspense>
      ),
      children: [
        // ===============================
        // ADMIN (ROLE = 0)
        // ===============================
        {
          path: "/",
          element: (
            <ProtectedRoute allowedRoles={[0]}>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              ),
            },
            {
              path: paths.courses,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Courses />
                </Suspense>
              ),
            },
            {
              path: paths.users,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <UserMan />
                </Suspense>
              ),
            },
            {
              path: paths.contents,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Contents />
                </Suspense>
              ),
            },
            {
              path: paths.enrollments,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Enrollment />
                </Suspense>
              ),
            },
            {
              path: paths.courseById(":id"),
              element: (
                <Suspense fallback={<PageLoader />}>
                  <CourseById />
                </Suspense>
              ),
            },
          ],
        },

        // ===============================
        // USER (ROLE = 1)
        // ===============================
        {
          path: rootPaths.userRoot, // "/user"
          element: (
            <ProtectedRoute allowedRoles={[1]}>
              <UserLayout>
                <Outlet />
              </UserLayout>
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <UsersDashboard />
                </Suspense>
              ),
            },
            {
              path: paths.coursez,
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Coursez />
                </Suspense>
              ),
            },
          ],
        },

        // ===============================
        // AUTH
        // ===============================
        {
          path: rootPaths.authRoot, // "/auth"
          element: (
            <AuthRedirect>
              <AuthLayout>
                <Outlet />
              </AuthLayout>
            </AuthRedirect>
          ),
          children: [
            {
              path: paths.signin,
              element: (
                <Suspense fallback={<Splash />}>
                  <Signin />
                </Suspense>
              ),
            },
            {
              path: paths.signup,
              element: (
                <Suspense fallback={<Splash />}>
                  <Signup />
                </Suspense>
              ),
            },
          ],
        },

        // ===============================
        // UNAUTHORIZED
        // ===============================
        {
          path: "/unauthorized",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Unauthorized />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

export default router;
