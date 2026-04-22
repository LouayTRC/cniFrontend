export type MenuItem = {
  key?: string
  label?: string
  icon?: string
  link?: string
  collapsed?: boolean
  subMenu?: any
  isTitle?: boolean
  badge?: {
    text: string;
    variant: string;
  }
  parentKey?: string
  disabled?: boolean
}


export const ADMIN_MENU: MenuItem[] = [
  {
    key: 'general',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'apps-chat',
    icon: 'humbleicons:users',
    label: 'Gestion des Utilisateurs',
    link: '/admin/users',
  },
]


export const MENU: MenuItem[] = [
  {
    key: 'general',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'dashboards',
    badge: {
      text: "9+",
      variant: "success",
    },
    icon: 'solar:home-2-broken',
    label: 'Dashboard',
    link: '/index'
  },
  {
    key: 'apps',
    label: 'APPS',
    isTitle: true,
  },
  {
    key: 'apps-chat',
    icon: 'solar:chat-round-call-broken',
    label: 'Chat',
    link: '/apps/chat',
  },
  {
    key: 'apps-email',
    icon: 'solar:letter-broken',
    label: 'Email',
    link: '/apps/email',
  },
  {
    key: 'apps-calendar',
    icon: 'solar:calendar-broken',
    label: 'Calendar',
    collapsed: true,
    subMenu: [
      {
        key: 'calendar-schedule',
        label: 'Schedule',
        link: '/calendar/schedule',
        parentKey: 'apps-calendar',
      },
      {
        key: 'calendar-integration',
        label: 'Integration',
        link: '/calendar/integration',
        parentKey: 'apps-calendar',
      },
    ],
  },
  {
    key: 'apps-todo',
    icon: 'solar:list-heart-minimalistic-broken',
    label: 'Todo',
    link: '/apps/todo',
  },
  {
    key: 'apps-invoices',
    icon: 'solar:bill-list-broken',
    label: 'Invoices',
    collapsed: true,
    subMenu: [
      {
        key: 'invoices',
        label: 'Invoices',
        link: '/invoices',
        parentKey: 'apps-invoices',
      },
      {
        key: 'invoices-details',
        label: 'Invoice Details',
        link: '/invoice/RB6985',
        parentKey: 'apps-invoices',
      },
    ],
  },
  {
    key: 'custom',
    label: 'Custom',
    isTitle: true,
  },
  {
    key: 'pages',
    label: 'Pages',
    isTitle: false,
    icon: 'solar:folder-with-files-broken',
    collapsed: true,
    subMenu: [
      {
        key: 'page-welcome',
        label: 'Welcome',
        link: '/pages/welcome',
        parentKey: 'pages',
      },
      {
        key: 'page-faqs',
        label: 'FAQs',
        link: '/pages/faqs',
        parentKey: 'pages',
      },
      {
        key: 'page-coming-soon',
        label: 'Coming Soon',
        link: '/coming-soon',
        parentKey: 'pages',
      },
      {
        key: 'page-timeline',
        label: 'Timeline',
        link: '/pages/timeline',
        parentKey: 'pages',
      },
      {
        key: 'page-pricing',
        label: 'Pricing',
        link: '/pages/pricing',
        parentKey: 'pages',
      },
      {
        key: 'page-maintenance',
        label: 'Maintenance',
        link: '/maintenance',
        parentKey: 'pages',
      },
      {
        key: 'page-404-error',
        label: '404 Error',
        link: '/error-404',
        parentKey: 'pages',
      },
      {
        key: 'page-error-404-alt',
        label: 'Error 404 (alt)',
        link: '/pages/error-404-alt',
        parentKey: 'pages',
      },
    ],
  },
  {
    key: 'page-authentication',
    label: 'Authentication',
    isTitle: false,
    icon: 'solar:lock-password-unlocked-broken',
    collapsed: true,
    subMenu: [
      {
        key: 'sign-in',
        label: 'Sign In',
        link: '/auth/sign-in',
        parentKey: 'page-authentication',
      },
      {
        key: 'signup',
        label: 'Sign Up',
        link: '/auth/sign-up',
        parentKey: 'page-authentication',
      },
      {
        key: 'reset-pass',
        label: 'Reset Password',
        link: '/auth/reset-pass',
        parentKey: 'page-authentication',
      },
      {
        key: 'lock-screen',
        label: 'Lock Screen',
        link: '/auth/lock-screen',
        parentKey: 'page-authentication',
      },
    ],
  },

]