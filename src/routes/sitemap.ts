import paths from './paths';
// import ContentPasteIcon from '@mui/icons-material/ContentPaste';
export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Overview',
    path: '/',
    icon: 'hugeicons:grid-view',
    active: true,
  },
  {
    id: 'courses',
    subheader: 'Course Management',
    path: paths.courses,
    icon: 'hugeicons:book-open-01',
     active: true,
  },
  {
    id: 'content',
    subheader: 'Content Management',
    path: paths.contents,
    icon: 'mdi:content-paste',
     active: true,
  },
  {
    id: 'users',
    subheader: 'Mentor Management',
    path: paths.users,
    icon: 'mdi:clipboard-account',
     active: true,
  },
   {
    id: 'enrollments',
    subheader: 'Enrollment Management',
    path: paths.enrollments,
    icon: 'mdi:sale',
     active: true,
  },
  {
    id: 'payments',
    subheader: 'Payment Management',
    path: '#!',
    icon: 'mdi:credit-card-multiple',
     active: true,
  },
  {
    id: 'certificates',
    subheader: 'Certificate Management',
    path: '#!',
    icon: 'mdi:file-certificate',
     active: true,
  },
  {
    id: 'ratings',
    subheader: 'Rating & Reviews Management',
    path: '#!',
    icon: 'mdi:message-star',
     active: true,
  },
  {
    id: 'settings',
    subheader: 'Settings',
    path: '#!',
    icon: 'hugeicons:settings-01',
     active: true,
  },
  // {
  //   id: 'authentication',
  //   subheader: 'Authentication',
  //   icon: 'mynaui:lock-password',
  //   active: true,
  //   items: [
  //     {
  //       name: 'Sign In',
  //       pathName: 'signin',
  //       icon: '',
  //       path: paths.signin,
  //     },
  //     {
  //       name: 'Sign Up',
  //       pathName: 'signup',
  //       icon: '',
  //       path: paths.signup,
  //     },
  //   ],
  // },
];

export default sitemap;
