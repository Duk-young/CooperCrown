import { authRoles } from 'app/auth';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: '',
    translate: '',
    type: 'group',
    auth: authRoles.staff,
    icon: 'apps',
    children: [
      // {
      //   id: 'dashboards',
      //   title: 'Dashboards',
      //   translate: 'DASHBOARDS',
      //   auth: authRoles.staff,
      //   type: 'collapse',
      //   icon: 'dashboard',
      //   children: [
      //     {
      //       id: 'analytics-dashboard',
      //       title: 'Analytics',
      //       auth: authRoles.staff,
      //       type: 'item',
      //       url: '/apps/dashboards/analytics'
      //     },
      //     {
      //       id: 'project-dashboard',
      //       title: 'Project',
      //       auth: authRoles.staff,
      //       type: 'item',
      //       url: '/apps/dashboards/project'
      //     }
      //   ]
      // },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'Appointments',
        type: 'item',
        auth: authRoles.staff,
        icon: 'today',
        url: '/apps/calendar'
      },
      {
        id: 'customers',
        title: 'Customers',
        translate: 'Customers',
        type: 'item',
        auth: authRoles.staff,
        icon: 'group',
        url: '/apps/e-commerce/customers'
      },
      {
        id: 'orders',
        title: 'Orders',
        translate: 'Orders',
        auth: authRoles.staff,
        type: 'item',
        icon: 'description',
        url: '/apps/e-commerce/orders'
      },
      {
        id: 'insurance',
        title: 'insurance',
        translate: 'Insurance',
        type: 'item',
        auth: authRoles.staff,
        icon: 'policy',
        url: '/apps/e-commerce/insurance'
      },
      {
        id: 'inventory',
        title: 'Inventory',
        translate: 'Inventory',
        auth: authRoles.staff,
        type: 'item',
        icon: 'category',
        url: '/apps/inventory'
      },
      {
        id: 'paymentReport',
        title: 'Payment Report',
        translate: 'Payment Report',
        auth: authRoles.staff,
        type: 'item',
        icon: 'calculator',
        url: '/apps/e-commerce/paymentreport'
      },
      {
        id: 'reports',
        title: 'Dashboard',
        translate: 'Dashboard',
        type: 'item',
        auth: authRoles.staff,
        icon: 'assessment',
        url: '/apps/e-commerce/reports'
      },
      {
        id: 'Setting',
        title: 'Setting',
        translate: 'Setting',
        type: 'collapse',
        auth: authRoles.staff,
        icon: 'settings',
        children: [
          {
            id: 'Account-Setting',
            title: 'Account Setting',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/AccountSetting',
            exact: true
          },
          {
            id: 'Security-And-Privacy',
            title: 'Security And Privacy',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/SecurityAndPrivacy',
            exact: true
          },
          {
            id: 'Terms-And-Conditions',
            title: 'Terms And Conditions',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/termsandconditions',
            exact: true
          },
          {
            id: 'Showroom-Managment',
            title: 'Showroom Managment',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/showRooms',
            exact: true
          },
          {
            id: 'Doctor-Management',
            title: 'Doctor Management',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/doctors',
            exact: true
          },
          
          {
            id: 'user-management',
            title: 'User Management',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/users', // update to user management
            exact: true
          },
          {
            id: 'emailTemplates',
            title: 'Email Templates',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/emailtemplates',
            exact: true
          },
          {
            id: 'priceSetting',
            title: 'Price Setting',
            type: 'collapse',
            auth: authRoles.staff,
            // url: '/apps/e-commerce/pricesettings',
            // exact: true
            translate: 'Price Setting',
            icon: '',
            children: [
              {
                id: 'lens-price',
                title: 'Lens Price',
                auth: authRoles.staff,
                type: 'item',
                url: '/apps/e-commerce/lensPrice'
              },
              {
                id: 'contact-price',
                title: 'Contact Price',
                auth: authRoles.staff,
                type: 'item',
                url: '/apps/e-commerce/contacts'
              },
              {
                id: 'service-price',
                title: 'Service Price',
                auth: authRoles.staff,
                type: 'item',
                url: '/apps/e-commerce/services'
              },
              {
                id: 'dicount-price',
                title: 'Discount Price',
                auth: authRoles.staff,
                type: 'item',
                url: '/apps/e-commerce/discounts'
              }
            ]
          }
        ]
      }
    ]
  }
];

export default navigationConfig;
