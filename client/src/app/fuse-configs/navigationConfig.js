import { authRoles } from 'app/auth';
import MaterialUIComponentsNavigation from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
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
    translate: 'APPLICATIONS',
    type: 'group',
    auth: authRoles.staff,
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'DASHBOARDS',
        auth: authRoles.staff,
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'analytics-dashboard',
            title: 'Analytics',
            auth: authRoles.staff,
            type: 'item',
            url: '/apps/dashboards/analytics'
          },
          {
            id: 'project-dashboard',
            title: 'Project',
            auth: authRoles.staff,
            type: 'item',
            url: '/apps/dashboards/project'
          }
        ]
      },
      {
        id: 'inventory',
        title: 'Inventory',
        translate: 'Inventory',
        auth: authRoles.staff,
        type: 'collapse',
        icon: 'all_inbox',
        children: [
          {
            id: 'inventory-list',
            title: 'Lists',
            auth: authRoles.staff,
            type: 'item',
            url: '/apps/inventory/lists'
          }
          // {
          //   id: 'project-dashboard',
          //   title: 'Project',
          //   auth: authRoles.staff,
          //   type: 'item',
          //   url: '/apps/dashboards/project'
          // }
        ]
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
        id: 'calendar',
        title: 'Calendar',
        translate: 'Appointments',
        type: 'item',
        auth: authRoles.staff,
        icon: 'today',
        url: '/apps/calendar'
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
            id: 'Showroom-Managment',
            title: 'Showroom Managment',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/showRooms',
            exact: true
          },
          {
            id: 'user-creation',
            title: 'User Creation',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/users',
            exact: true
          },
          {
            id: 'user-management',
            title: 'User Management',
            type: 'item',
            auth: authRoles.staff,
            url: '/apps/e-commerce/users-management',
            exact: true
          },
          {
            id: 'priceSetting',
            title: 'Price Setting',
            translate: 'Price Setting',
            auth: authRoles.staff,
            type: 'collapse',
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

      //     {
      //       id: 'mail',
      //       title: 'Mail',
      //       translate: 'MAIL',
      //       type: 'item',
      //       icon: 'email',
      //       auth: authRoles.staff,
      //       url: '/apps/mail',
      //       badge: {
      //         title: 25,
      //         bg: '#F44336',
      //         fg: '#FFFFFF'
      //       }
      //     },
      //     {
      //       id: 'todo',
      //       title: 'To-Do',
      //       translate: 'TODO',
      //       type: 'item',
      //       icon: 'check_box',
      //       auth: authRoles.staff,
      //       url: '/apps/todo',
      //       badge: {
      //         title: 3,
      //         bg: 'rgb(255, 111, 0)',
      //         fg: '#FFFFFF'
      //       }
      //     },
      //     {
      //       id: 'file-manager',
      //       title: 'File Manager',
      //       translate: 'FILE_MANAGER',
      //       type: 'item',
      //       auth: authRoles.staff,
      //       icon: 'folder',
      //       url: '/apps/file-manager'
      //     },
      //     {
      //       id: 'contacts',
      //       title: 'Contacts',
      //       translate: 'CONTACTS',
      //       auth: authRoles.staff,
      //       type: 'item',
      //       icon: 'account_box',
      //       url: '/apps/contacts/all'
      //     },
      //     {
      //       id: 'chat',
      //       title: 'Chat',
      //       translate: 'CHAT',
      //       type: 'item',
      //       icon: 'chat',
      //       url: '/apps/chat',
      //       auth: authRoles.staff,
      //       badge: {
      //         title: 13,
      //         bg: 'rgb(9, 210, 97)',
      //         fg: '#FFFFFF'
      //       }
      //     },
      //     {
      //       id: 'scrumboard',
      //       title: 'Scrumboard',
      //       translate: 'SCRUMBOARD',
      //       auth: authRoles.staff,
      //       type: 'item',
      //       icon: 'assessment',
      //       url: '/apps/scrumboard'
      //     },
      //     {
      //       id: 'notes',
      //       title: 'Notes',
      //       translate: 'NOTES',
      //       auth: authRoles.staff,
      //       type: 'item',
      //       icon: 'note',
      //       url: '/apps/notes'
      //     }
      //   ]
      // },

      // {
      //   id: 'user-interface',
      //   title: 'User Interface',
      //   auth: authRoles.staff,

      //   type: 'group',
      //   icon: 'web',
      //   children: [
      //     {
      //       id: 'icons',
      //       title: 'Icons',
      //       type: 'item',
      //       icon: 'photo',
      //       auth: authRoles.staff,

      //       url: '/ui/icons'
      //     },
      //     {
      //       id: 'typography',
      //       title: 'Typography',
      //       type: 'item',
      //       icon: 'text_fields',
      //       auth: authRoles.staff,

      //       url: '/ui/typography'
      //     },
      //     {
      //       id: 'helper-classes',
      //       title: 'Helper Classes',
      //       type: 'item',
      //       icon: 'help',
      //       auth: authRoles.staff,

      //       url: '/ui/helper-classes'
      //     },
      //     {
      //       id: 'page-layouts',
      //       title: 'Page Layouts',
      //       type: 'collapse',
      //       auth: authRoles.staff,

      //       icon: 'view_quilt',
      //       children: [
      //         {
      //           id: 'carded',
      //           title: 'Carded',
      //           auth: authRoles.staff,

      //           type: 'collapse',
      //           badge: {
      //             title: 12,
      //             bg: '#525E8A',
      //             fg: '#FFFFFF'
      //           },
      //           children: [
      //             {
      //               id: 'carded-full-width',
      //               title: 'Full Width',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/full-width'
      //             },
      //             {
      //               id: 'carded-full-width-tabbed',
      //               title: 'Full Width Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/full-width-tabbed'
      //             },
      //             {
      //               id: 'carded-full-width-2',
      //               title: 'Full Width 2',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/full-width-2'
      //             },
      //             {
      //               id: 'carded-full-width-2-tabbed',
      //               title: 'Full Width 2 Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/full-width-2-tabbed'
      //             },
      //             {
      //               id: 'carded-left-sidebar',
      //               title: 'Left Sidebar',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/left-sidebar'
      //             },
      //             {
      //               id: 'carded-left-sidebar-tabbed',
      //               title: 'Left Sidebar Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/left-sidebar-tabbed'
      //             },
      //             {
      //               id: 'carded-left-sidebar-2',
      //               title: 'Left Sidebar 2',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/left-sidebar-2'
      //             },
      //             {
      //               id: 'carded-left-sidebar-2-tabbed',
      //               title: 'Left Sidebar 2 Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/left-sidebar-2-tabbed'
      //             },
      //             {
      //               id: 'carded-right-sidebar',
      //               title: 'Right Sidebar',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/right-sidebar'
      //             },
      //             {
      //               id: 'carded-right-sidebar-tabbed',
      //               title: 'Right Sidebar Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/right-sidebar-tabbed'
      //             },
      //             {
      //               id: 'carded-right-sidebar-2',
      //               title: 'Right Sidebar 2',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/right-sidebar-2'
      //             },
      //             {
      //               id: 'carded-right-sidebar-2-tabbed',
      //               title: 'Right Sidebar 2 Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/carded/right-sidebar-2-tabbed'
      //             }
      //           ]
      //         },
      //         {
      //           id: 'simple',
      //           title: 'Simple',
      //           auth: authRoles.staff,

      //           type: 'collapse',
      //           badge: {
      //             title: 8,
      //             bg: '#525E8A',
      //             fg: '#FFFFFF'
      //           },
      //           children: [
      //             {
      //               id: 'simple-full-width',
      //               title: 'Full Width',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/full-width'
      //             },
      //             {
      //               id: 'simple-left-sidebar',
      //               title: 'Left Sidebar',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/left-sidebar'
      //             },
      //             {
      //               id: 'simple-left-sidebar-2',
      //               title: 'Left Sidebar 2',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/left-sidebar-2'
      //             },
      //             {
      //               id: 'simple-left-sidebar-3',
      //               title: 'Left Sidebar 3',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/left-sidebar-3'
      //             },
      //             {
      //               id: 'simple-right-sidebar',
      //               title: 'Right Sidebar',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/right-sidebar'
      //             },
      //             {
      //               id: 'simple-right-sidebar-2',
      //               title: 'Right Sidebar 2',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/right-sidebar-2'
      //             },
      //             {
      //               id: 'simple-right-sidebar-3',
      //               title: 'Right Sidebar 3',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/right-sidebar-3'
      //             },
      //             {
      //               id: 'simple-tabbed',
      //               title: 'Tabbed',
      //               type: 'item',
      //               auth: authRoles.staff,

      //               url: '/ui/page-layouts/simple/tabbed'
      //             }
      //           ]
      //         },
      //         {
      //           id: 'blank',
      //           title: 'Blank',
      //           auth: authRoles.staff,

      //           type: 'item',
      //           url: '/ui/page-layouts/blank'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   id: 'Documentation',
      //   title: 'Documentation',
      //   type: 'group',
      //   icon: 'star',
      //   children: [
      //     {
      //       id: 'changelog',
      //       title: 'Changelog',
      //       type: 'item',
      //       auth: authRoles.staff,

      //       icon: 'history',
      //       url: '/documentation/changelog',
      //       badge: {
      //         title: '4.1.5',
      //         bg: 'rgb(236, 12, 142)',
      //         fg: '#FFFFFF'
      //       }
      //     },
      //     {
      //       id: 'getting-started-doc',
      //       title: 'Getting Started',
      //       type: 'collapse',
      //       icon: 'import_contacts',
      //       children: [
      //         {
      //           id: 'introduction-doc',
      //           title: 'Introduction',
      //           type: 'item',
      //           auth: authRoles.staff,
      //           url: '/documentation/getting-started/introduction'
      //         },
      //         {
      //           id: 'installation-doc',
      //           title: 'Installation',
      //           type: 'item',
      //           url: '/documentation/getting-started/installation'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'working-with-fuse-react-doc',
      //       title: 'Working with Fuse React',
      //       type: 'collapse',
      //       icon: 'import_contacts',
      //       children: [
      //         {
      //           id: 'development-doc',
      //           title: 'Development',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/development'
      //         },
      //         {
      //           id: 'production-doc',
      //           title: 'Production',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/production'
      //         },
      //         {
      //           id: 'project-structure-doc',
      //           title: 'Project Structure',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/project-structure'
      //         },
      //         {
      //           id: 'updating-fuse-react-doc',
      //           title: 'Updating Fuse React',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/updating-fuse-react'
      //         },
      //         {
      //           id: 'theming-doc',
      //           title: 'Theming',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/theming'
      //         },
      //         {
      //           id: 'theme-layouts-doc',
      //           title: 'Theme Layouts',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/theme-layouts'
      //         },
      //         {
      //           id: 'page-layouts-doc',
      //           title: 'Page Layouts',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/page-layouts'
      //         },
      //         {
      //           id: 'settings-doc',
      //           title: 'Settings',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/settings'
      //         },
      //         {
      //           id: 'fuse-react-routing-doc',
      //           title: 'Routing',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/routing'
      //         },
      //         {
      //           id: 'fuse-react-code-splitting-doc',
      //           title: 'Code Splitting',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/code-splitting'
      //         },
      //         {
      //           id: 'fuse-react-rtl-doc',
      //           title: 'RTL Support',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/rtl-support'
      //         },
      //         {
      //           id: 'fuse-react-multi-language-doc',
      //           title: 'Multi Language',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/multi-language'
      //         },
      //         {
      //           id: 'fuse-react-ides-vscode-webstorm-doc',
      //           title: 'IDEs (Webstorm, VsCode)',
      //           type: 'item',
      //           url: '/documentation/working-with-fuse-react/ides-vscode-webstorm'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'authentication-doc',
      //       title: 'Authentication',
      //       type: 'collapse',
      //       icon: 'import_contacts',
      //       children: [
      //         {
      //           id: 'jwt-auth-doc',
      //           title: 'JWT',
      //           type: 'item',
      //           url: '/documentation/authentication/jwt'
      //         },
      //         {
      //           id: 'firebase-auth-doc',
      //           title: 'Firebase',
      //           type: 'item',
      //           url: '/documentation/authentication/firebase'
      //         },
      //         {
      //           id: 'auth0-auth-doc',
      //           title: 'Auth0',
      //           type: 'item',
      //           url: '/documentation/authentication/auth0'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'fuse-components',
      //       title: 'Fuse Components',
      //       type: 'collapse',
      //       icon: 'widgets',
      //       children: [
      //         {
      //           id: 'fuse-auth',
      //           title: 'FuseAuthorization',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-authorization'
      //         },
      //         {
      //           id: 'fuse-theme',
      //           title: 'FuseTheme',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-theme'
      //         },
      //         {
      //           id: 'fuse-layout',
      //           title: 'FuseLayout',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-layout'
      //         },
      //         {
      //           id: 'fuse-components-page',
      //           title: 'Fuse Page Layouts',
      //           type: 'collapse',
      //           children: [
      //             {
      //               id: 'fuse-page-carded',
      //               title: 'FusePageCarded',
      //               type: 'item',
      //               url: '/documentation/fuse-components/fuse-page-carded'
      //             },
      //             {
      //               id: 'fuse-page-simple',
      //               title: 'FusePageSimple',
      //               type: 'item',
      //               url: '/documentation/fuse-components/fuse-page-simple'
      //             }
      //           ]
      //         },
      //         {
      //           id: 'fuse-navigation',
      //           title: 'FuseNavigation',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-navigation'
      //         },
      //         {
      //           id: 'fuse-scrollbars',
      //           title: 'FuseScrollbars',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-scrollbars'
      //         },
      //         {
      //           id: 'fuse-highlight',
      //           title: 'FuseHighlight',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-highlight'
      //         },
      //         {
      //           id: 'fuse-countdown',
      //           title: 'FuseCountdown',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-countdown'
      //         },
      //         {
      //           id: 'fuse-message',
      //           title: 'FuseMessage',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-message'
      //         },
      //         {
      //           id: 'fuse-dialog',
      //           title: 'FuseDialog',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-dialog'
      //         },
      //         {
      //           id: 'fuse-animate',
      //           title: 'FuseAnimate',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-animate'
      //         },
      //         {
      //           id: 'fuse-animate-group',
      //           title: 'FuseAnimateGroup',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-animate-group'
      //         },
      //         {
      //           id: 'fuse-chip-select',
      //           title: 'FuseChipSelect',
      //           type: 'item',
      //           url: '/documentation/fuse-components/fuse-chip-select'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'material-ui-components',
      //       title: 'Material UI Components',
      //       type: 'collapse',
      //       icon: 'layers',
      //       children: [...MaterialUIComponentsNavigation]
      //     },
      //     {
      //       id: '3rd-party-components',
      //       title: '3rd Party Components',
      //       type: 'collapse',
      //       icon: 'settings_input_component',
      //       children: [
      //         {
      //           id: 'datatables',
      //           title: 'Datatables',
      //           type: 'collapse',
      //           children: [
      //             {
      //               id: 'react-table',
      //               title: 'React Table',
      //               type: 'item',
      //               url:
      //                 '/documentation/third-party-components/datatables/react-table'
      //             }
      //           ]
      //         },
      //         {
      //           id: 'formsy',
      //           title: 'Formsy',
      //           type: 'item',
      //           url: '/documentation/third-party-components/formsy'
      //         },
      //         {
      //           id: 'google-map-react',
      //           title: 'Google Map React',
      //           type: 'item',
      //           url: '/documentation/third-party-components/google-map-react'
      //         },
      //         {
      //           id: 'react-chartjs-2',
      //           title: 'React ChartJs 2',
      //           type: 'item',
      //           url: '/documentation/third-party-components/react-chartjs-2'
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   type: 'divider',
      //   id: 'divider-1'
      // },
      // {
      //   id: 'auth',
      //   title: 'Auth',
      //   type: 'group',
      //   icon: 'apps',
      //   children: [
      //     {
      //       id: 'login',
      //       title: 'Login',
      //       type: 'item',
      //       url: '/login',
      //       auth: authRoles.onlyGuest,
      //       icon: 'lock'
      //     },
      //     {
      //       id: 'register',
      //       title: 'Register',
      //       type: 'item',
      //       url: '/register',
      //       auth: authRoles.onlyGuest,
      //       icon: 'person_add'
      //     },
      //     {
      //       id: 'logout',
      //       title: 'Logout',
      //       type: 'item',
      //       auth: authRoles.user,
      //       url: '/logout',
      //       icon: 'exit_to_app'
      //     },
      //     {
      //       id: 'auth-admin-example',
      //       title: 'Admin: Auth protected page',
      //       type: 'item',
      //       url: '/auth/admin-role-example',
      //       icon: 'security'
      //     },
      //     {
      //       id: 'only-admin-navigation-item',
      //       title: 'Nav item only for Admin',
      //       type: 'item',
      //       auth: authRoles.admin,
      //       url: '/auth/admin-role-example',
      //       icon: 'verified_user'
      //     },
      //     {
      //       id: 'auth-staff-example',
      //       title: 'Staff: Auth protected page',
      //       type: 'item',
      //       url: '/auth/staff-role-example',
      //       icon: 'security'
      //     },
      //     {
      //       id: 'only-staff-navigation-item',
      //       title: 'Nav item only for Staff',
      //       type: 'item',
      //       auth: authRoles.staff,
      //       url: '/auth/staff-role-example',
      //       icon: 'verified_user'
      //     },
      //     {
      //       id: 'auth-guest-example',
      //       title: 'Guest: Auth protected page',
      //       type: 'item',
      //       url: '/auth/guest-role-example',
      //       icon: 'security'
      //     },
      //     {
      //       id: 'only-guest-navigation-item',
      //       title: 'Nav item only for Guest',
      //       type: 'item',
      //       auth: authRoles.onlyGuest,
      //       url: '/auth/guest-role-example',
      //       icon: 'verified_user'
      //     }
      //   ]
      // },
      // {
      //   type: 'divider',
      //   id: 'divider-2'
      // },
      // {
      //   id: 'test-group-level-1',
      //   title: 'Test Group Level 1',
      //   type: 'group',
      //   icon: 'apps',
      //   children: [
      //     {
      //       id: 'test-item',
      //       title: 'Test Item',
      //       type: 'item',
      //       icon: 'list',
      //       url: '#'
      //     },
      //     {
      //       id: 'test-link',
      //       title: 'Test Link',
      //       type: 'link',
      //       icon: 'link',
      //       url: 'http://fusetheme.com',
      //       target: '_blank'
      //     },
      //     {
      //       id: 'test-collapse-level-1',
      //       title: 'Test Collapse Level 1',
      //       type: 'collapse',
      //       icon: 'dashboard',
      //       children: [
      //         {
      //           id: 'test-item-level-1',
      //           title: 'Test Item Level 1',
      //           type: 'item',
      //           url: '#'
      //         },
      //         {
      //           id: 'test-link-level-1',
      //           title: 'Test Link Level 1',
      //           type: 'link',
      //           url: 'http://fusetheme.com',
      //           target: '_blank'
      //         },
      //         {
      //           id: 'test-collapse-2',
      //           title: 'Test Collapse Level 2',
      //           type: 'collapse',
      //           children: [
      //             {
      //               id: 'test-item-level-2',
      //               title: 'Test Item Level 2',
      //               type: 'item',
      //               url: '#'
      //             },
      //             {
      //               id: 'test-link-level-2',
      //               title: 'Test Link Level 2',
      //               type: 'link',
      //               url: 'http://fusetheme.com',
      //               target: '_blank'
      //             },
      //             {
      //               id: 'test-collapse-level-3',
      //               title: 'Test Collapse Level 3',
      //               type: 'collapse',
      //               children: [
      //                 {
      //                   id: 'test-item-level-3',
      //                   title: 'Test Item Level 3',
      //                   type: 'item',
      //                   url: '#'
      //                 },
      //                 {
      //                   id: 'test-link-level-3',
      //                   title: 'Test Link Level 3',
      //                   type: 'link',
      //                   url: 'http://fusetheme.com',
      //                   target: '_blank'
      //                 },
      //                 {
      //                   id: 'test-collapse-level-4',
      //                   title: 'Test Collapse Level 4',
      //                   type: 'collapse',
      //                   children: [
      //                     {
      //                       id: 'test-item-level-4',
      //                       title: 'Test Item Level 4',
      //                       type: 'item',
      //                       url: '#'
      //                     }
      //                   ]
      //                 }
      //               ]
      //             }
      //           ]
      //         },
      //         {
      //           id: 'test-group-level-2',
      //           title: 'Test Group Level 2',
      //           type: 'group',
      //           icon: 'apps',
      //           children: [
      //             {
      //               id: 'test-collapse-level-2-2',
      //               title: 'Test Collapse Level 2',
      //               type: 'collapse',
      //               children: [
      //                 {
      //                   id: 'test-item-level-2-2',
      //                   title: 'Test Item Level 2',
      //                   type: 'item',
      //                   url: '#'
      //                 },
      //                 {
      //                   id: 'test-link-level-2-2',
      //                   title: 'Test Link Level 2',
      //                   type: 'link',
      //                   url: 'http://fusetheme.com',
      //                   target: '_blank'
      //                 }
      //               ]
      //             }
      //           ]
      //         }
      //       ]
      //     }
    ]
  }
];

export default navigationConfig;
