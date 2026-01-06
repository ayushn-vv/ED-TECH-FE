// ---------------------------
// ROOT PATH GROUPS
// (Used ONLY in router definitions)
// ---------------------------
export const rootPaths = {
  root: '/',
  pageRoot: '/',                 // Admin root
  userRoot: '/user',              // User root
  authRoot: '/authentication',    // Auth root
  authuserRoot: '/authuser',      // Auth user root
  errorRoot: '/error',            // Error root
} as const;

// ---------------------------
// UI ROUTES
// (Used INSIDE nested routes & navigation)
// ---------------------------
export const paths = {
  // =========================
  // ADMIN ROUTES (nested under "/")
  // =========================
  dashboard: '',
  courses: 'courses',
  enrollments: 'enrollment',
  users: 'users',
  mentors: 'mentors',
  contents: 'contents',
  settings: 'settings',
  account: 'account',
  courseById: (id: number | string) => `/${id}`,

  // =========================
  // USER ROUTES (nested under "/user")
  // =========================
  userDashboard: '',
  coursez: 'allcourses',

  // =========================
  // AUTH ROUTES (nested under "/authentication")
  // =========================
  signin: 'signin',
  signup: 'signup',
  forgotPassword: 'forgot-password',

  // =========================
  // AUTH USER ROUTES (nested under "/authuser")
  // =========================
  authusersignin: 'signin-user',
  authusersignup: 'signup-user',

  // =========================
  // ERROR ROUTES (nested under "/error")
  // =========================
  notFound: '404',
} as const;

export default paths;
