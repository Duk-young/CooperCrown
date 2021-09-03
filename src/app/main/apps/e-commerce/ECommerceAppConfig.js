import React from 'react';
import { Redirect } from 'react-router-dom';

const ECommerceAppConfig = {
  settings: {
    layout: {}
  },
  routes: [
    {
      path: '/apps/e-commerce/showRoom/:showRoomtId/:showRoomHandle?',
      component: React.lazy(() => import('./NewShowRoom/NewShowRoom'))
    },
    {
      path: '/apps/e-commerce/showRooms',
      component: React.lazy(() => import('./products/Products'))
    },
    {
      path: '/apps/e-commerce/contact/:contactId',
      component: React.lazy(() => import('./Contact/Contact'))
    },
    {
      path: '/apps/e-commerce/lensPrice',
      component: React.lazy(() => import('./LensPrice/LensPrice'))
    },
    {
      path: '/apps/e-commerce/contacts',
      component: React.lazy(() => import('./Contacts/Contacts'))
    },
    {
      path: '/apps/e-commerce/user/:userId',
      component: React.lazy(() => import('./User/User'))
    },
    {
      path: '/apps/e-commerce/users',
      component: React.lazy(() => import('./Users/Users'))
    },
    {
      path: '/apps/e-commerce/discount/:discountId',
      component: React.lazy(() => import('./Discount/Discount'))
    },
    {
      path: '/apps/e-commerce/discounts',
      component: React.lazy(() => import('./Discounts/Discounts'))
    },
    {
      path: '/apps/e-commerce/service/:serviceId',
      component: React.lazy(() => import('./Service/Service'))
    },
    {
      path: '/apps/e-commerce/services',
      component: React.lazy(() => import('./Services/Services'))
    },
    {
      path: '/apps/AccountSetting/:uid',
      component: React.lazy(() => import('./Account/AccountSettings'))
    },
    {
      path: '/apps/SecurityAndPrivacy/:uid',
      component: React.lazy(() =>
        import('./SecurityAndPrivacy/SecurityAndPrivacy')
      )
    },
    {
      path: '/apps/e-commerce',
      component: () => <Redirect to="/apps/e-commerce/showRooms" />
    }
  ]
};

export default ECommerceAppConfig;
