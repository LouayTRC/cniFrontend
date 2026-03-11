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
  {
    key: 'widgets',
    icon: 'solar:gift-broken',
    label: 'Widgets',
    link: '/widgets',
    badge: {
      variant: 'danger',
      text: 'Hot',
    },
  },
  {
    key: 'components',
    label: 'COMPONENTS',
    isTitle: true,
  },
  {
    key: 'base-ui',
    icon: 'solar:fire-broken',
    label: 'Base UI',
    collapsed: true,
    subMenu: [
      {
        key: 'base-ui-accordions',
        label: 'Accordion',
        link: '/ui/accordions',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-alerts',
        label: 'Alerts',
        link: '/ui/alerts',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-avatars',
        label: 'Avatar',
        link: '/ui/avatars',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-badges',
        label: 'Badge',
        link: '/ui/badges',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-breadcrumb',
        label: 'Breadcrumb',
        link: '/ui/breadcrumb',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-buttons',
        label: 'Buttons',
        link: '/ui/buttons',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-cards',
        label: 'Card',
        link: '/ui/cards',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-carousel',
        label: 'Carousel',
        link: '/ui/carousel',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-collapse',
        label: 'Collapse',
        link: '/ui/collapse',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-dropdowns',
        label: 'Dropdown',
        link: '/ui/dropdowns',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-list-group',
        label: 'List Group',
        link: '/ui/list-group',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-modals',
        label: 'Modal',
        link: '/ui/modals',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-tabs',
        label: 'Tabs',
        link: '/ui/tabs',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-offcanvas',
        label: 'Offcanvas',
        link: '/ui/offcanvas',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-pagination',
        label: 'Pagination',
        link: '/ui/pagination',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-placeholders',
        label: 'Placeholders',
        link: '/ui/placeholders',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-popovers',
        label: 'Popovers',
        link: '/ui/popovers',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-progress',
        label: 'Progress',
        link: '/ui/progress',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-scrollspy',
        label: 'Scrollspy',
        link: '/ui/scrollspy',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-spinners',
        label: 'Spinners',
        link: '/ui/spinners',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-toasts',
        label: 'Toasts',
        link: '/ui/toasts',
        parentKey: 'base-ui',
      },
      {
        key: 'base-ui-tooltips',
        label: 'Tooltips',
        link: '/ui/tooltips',
        parentKey: 'base-ui',
      },
    ],
  },
  {
    key: 'advanced-ui',
    icon: 'solar:magic-stick-3-broken',
    label: 'Advanced UI',
    collapsed: true,
    subMenu: [
      {
        key: 'advanced-ui-ratings',
        label: 'Ratings',
        link: '/advanced/ratings',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-sweet-alert',
        label: 'Sweet Alert',
        link: '/advanced/alert',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-swiper-slider',
        label: 'Swiper Slider',
        link: '/advanced/swiper',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-scrollbar',
        label: 'Scrollbar',
        link: '/advanced/scrollbar',
        parentKey: 'advanced-ui',
      },
      {
        key: 'advanced-ui-toastify',
        label: 'Toastify',
        link: '/advanced/toastify',
        parentKey: 'advanced-ui',
      },
    ],
  },
  {
    key: 'charts',
    icon: 'solar:chart-square-broken',
    label: 'Charts',
    collapsed: true,
    subMenu: [
      {
        key: 'charts-area',
        label: 'Area',
        link: '/charts/area',
        parentKey: 'charts',
      },
      {
        key: 'charts-bar',
        label: 'Bar',
        link: '/charts/bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-bubble',
        label: 'Bubble',
        link: '/charts/bubble',
        parentKey: 'charts',
      },
      {
        key: 'charts-candl-stick',
        label: 'Candlestick',
        link: '/charts/candlestick',
        parentKey: 'charts',
      },
      {
        key: 'charts-column',
        label: 'Column',
        link: '/charts/column',
        parentKey: 'charts',
      },
      {
        key: 'charts-heatmap',
        label: 'Heatmap',
        link: '/charts/heatmap',
        parentKey: 'charts',
      },
      {
        key: 'charts-line',
        label: 'Line',
        link: '/charts/line',
        parentKey: 'charts',
      },
      {
        key: 'charts-mixed',
        label: 'Mixed',
        link: '/charts/mixed',
        parentKey: 'charts',
      },
      {
        key: 'charts-timeline',
        label: 'Timeline',
        link: '/charts/timeline',
        parentKey: 'charts',
      },
      {
        key: 'charts-boxplot',
        label: 'Boxplot',
        link: '/charts/boxplot',
        parentKey: 'charts',
      },
      {
        key: 'charts-treemap',
        label: 'Treemap',
        link: '/charts/treemap',
        parentKey: 'charts',
      },
      {
        key: 'charts-pie',
        label: 'Pie',
        link: '/charts/pie',
        parentKey: 'charts',
      },
      {
        key: 'charts-radar',
        label: 'Radar',
        link: '/charts/radar',
        parentKey: 'charts',
      },
      {
        key: 'charts-radial-bar',
        label: 'RadialBar',
        link: '/charts/radial-bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-scatter',
        label: 'Scatter',
        link: '/charts/scatter',
        parentKey: 'charts',
      },
      {
        key: 'charts-polar-area',
        label: 'Polar Area',
        link: '/charts/polar',
        parentKey: 'charts',
      },
    ],
  },
  {
    key: 'forms',
    icon: 'solar:checklist-broken',
    label: 'Forms',
    collapsed: true,
    subMenu: [
      {
        key: 'forms-basic-elements',
        label: 'Basic Elements',
        link: '/forms/basic',
        parentKey: 'forms',
      },
      {
        key: 'forms-checkbox&radio',
        label: 'Checkbox & Radio',
        link: '/forms/checkbox',
        parentKey: 'forms',
      },
      {
        key: 'forms-choice-select',
        label: 'Choice Select',
        link: '/forms/select',
        parentKey: 'forms',
      },
      {
        key: 'forms-clipboard',
        label: 'Clipboard',
        link: '/forms/clipboard',
        parentKey: 'forms',
      },
      {
        key: 'forms-flat-picker',
        label: 'Flatpicker',
        link: '/forms/flat-picker',
        parentKey: 'forms',
      },
      {
        key: 'forms-validation',
        label: 'Validation',
        link: '/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'forms-wizard',
        label: 'Wizard',
        link: '/forms/wizard',
        parentKey: 'forms',
      },
      {
        key: 'forms-file-uploads',
        label: 'File Upload',
        link: '/forms/file-uploads',
        parentKey: 'forms',
      },
      {
        key: 'forms-editors',
        label: 'Editors',
        link: '/forms/editors',
        parentKey: 'forms',
      },
      {
        key: 'forms-input-mask',
        label: 'Input Mask',
        link: '/forms/input-mask',
        parentKey: 'forms',
      },
      {
        key: 'forms-slider',
        label: 'Slider',
        link: '/forms/slider',
        parentKey: 'forms',
      },
    ],
  },
  {
    key: 'tables',
    icon: 'solar:bedside-table-4-broken',
    label: 'Tables',
    collapsed: true,
    subMenu: [
      {
        key: 'tables-basic',
        label: 'Basic Tables',
        link: '/tables/basic',
        parentKey: 'tables',
      },
      {
        key: 'tables-grid-js',
        label: 'Datatables',
        link: '/tables/datatable',
        parentKey: 'tables',
      },
    ],
  },
  {
    key: 'icons',
    icon: 'solar:bicycling-broken',
    label: 'Icons',
    collapsed: true,
    subMenu: [
      {
        key: 'icons-boxicons',
        label: 'Boxicons',
        link: '/icons/boxicons',
        parentKey: 'icons',
      },
      {
        key: 'icons-solar',
        label: 'Solar Icons',
        link: '/icons/solar',
        parentKey: 'icons',
      },
    ],
  },
  {
    key: 'maps',
    icon: 'solar:streets-map-point-broken',
    label: 'Maps',
    collapsed: true,
    subMenu: [
      {
        key: 'maps-google',
        label: 'Google Maps',
        link: '/maps/google',
        parentKey: 'maps',
      },
      {
        key: 'maps-vector',
        label: 'Vector Maps',
        link: '/maps/vector',
        parentKey: 'maps',
      },
    ],
  },
  {
    key: 'badge-menu',
    icon: 'solar:football-broken',
    label: 'Badge Menu',
    badge: {
      variant: 'primary',
      text: '1',
    },
  },
  {
    key: 'menuitem',
    icon: 'solar:share-broken',
    label: 'Menu Item',
    collapsed: true,
    subMenu: [
      {
        key: 'menu-item-1',
        label: 'Menu Item 1',
        parentKey: 'menuitem',
      },
      {
        key: 'menu-item-2',
        label: 'Menu Item 2',
        collapsed: true,
        parentKey: 'menuitem',
        subMenu: [
          {
            key: 'menu-sub-item',
            label: 'Menu Sub Item',
            parentKey: 'menu-item-2',
          },
        ],
      },
    ],
  },
  {
    key: 'disabled-item',
    icon: 'solar:dislike-broken',
    label: 'Disabled Item',
    disabled: true,
  },
]