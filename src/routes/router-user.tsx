// /* eslint-disable react-refresh/only-export-components */
// import { Suspense, lazy } from 'react';
// import { Outlet, createBrowserRouter } from 'react-router-dom';
// import paths, { rootPaths } from './paths';

// import MainLayout from 'layouts/main-layout';
// import AuthLayout from 'layouts/auth-layout';
// import Splash from 'components/loader/Splash';
// import PageLoader from 'components/loader/PageLoader';

// import ProtectedRoute from './protectedRoute';
// import AuthRedirect from './authRedirect';

// // Lazy import pages
// const App = lazy(() => import('App'));
// const Dashboard = lazy(() => import('pages/dashboard'));
// const Signin = lazy(() => import('pages/authentication/Signin'));
// const Signup = lazy(() => import('pages/authentication/Signup'));
// const Courses = lazy(() => import('../pages/Courses/index'));
// const Enrollment = lazy(() => import('../pages/Enrollment/index'));
// const Contents = lazy(() => import('../pages/Content/index'));
// const CorsesById = lazy(() => import('../pages/Courses/instructor/feat/courseById'));
// const UserMan = lazy(() => import('../pages/Users/index'));
// const router = createBrowserRouter(
//   [
//     {
//       element: (
//         <Suspense fallback={<Splash />}>
//           <App />
//         </Suspense>
//       ),
//       children: [
//         // ===========================
//         // MAIN PROTECTED AREA
//         // ===========================
//         {
//           path: '/',
//           element: (
//             <ProtectedRoute>
//               <MainLayout>
//                 <Outlet />
//               </MainLayout>
//             </ProtectedRoute>
//           ),
//           children: [
//             {
//               index: true,
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <Dashboard />
//                 </Suspense>
//               ),
//             },
//             {
//               path: paths.courses,
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <Courses />
//                 </Suspense>
//               ),
//             },
//              {
//               path: paths.users,
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <UserMan />
//                 </Suspense>
//               ),
//             },
//             {
//               path: paths.contents,
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <Contents />
//                 </Suspense>
//               ),
//             },
//             {
//               path: paths.enrollments,
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <Enrollment />
//                 </Suspense>
//               ),
//             },
//              {
//               path: paths.courseById(':id'),
//               element: (
//                 <Suspense fallback={<PageLoader />}>
//                   <CorsesById />
//                 </Suspense>
//               ),
//             },
//           ],
//         },

//         // ===========================
//         // AUTH AREA (Signin, Signup)
//         // ===========================
//         {
//           path: rootPaths.authRoot,
//           element: (
//             <AuthRedirect>
//               <AuthLayout>
//                 <Outlet />
//               </AuthLayout>
//             </AuthRedirect>
//           ),
//           children: [
//             {
//               path: paths.signin,
//               element: (
//                 <Suspense fallback={<Splash />}>
//                   <Signin />
//                 </Suspense>
//               ),
//             },
//             {
//               path: paths.signup,
//               element: (
//                 <Suspense fallback={<Splash />}>
//                   <Signup />
//                 </Suspense>
//               ),
//             },
//           ],
//         },
//       ],
//     },
//   ],
//   {
//     basename: '/',
//   },
// );

// export default router;
