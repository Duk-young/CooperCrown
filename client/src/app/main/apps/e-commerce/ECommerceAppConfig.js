import React from 'react';
// import { Redirect } from 'react-router-dom';

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
      path: '/apps/e-commerce/emailtemplates',
      component: React.lazy(() => import('./Emails/EmailTemplates'))
    },
    {
      path: '/apps/e-commerce/emailtemplates/filter',
      component: React.lazy(() => import('./Emails/EmailFilters'))
    },
    {
      path: '/apps/e-commerce/paymentreport',
      component: React.lazy(() => import('./PaymentReport/PaymentReport'))
    },
    {
      path: '/apps/e-commerce/insurances/viewclaim/:insuranceClaimId',
      component: React.lazy(() => import('./Insurance/InsuranceClaim'))
    },
    {
      path: '/apps/e-commerce/insurance',
      component: React.lazy(() => import('./Insurance/Insurance'))
    },
    {
      path: '/apps/e-commerce/showRooms',
      component: React.lazy(() => import('./Showrooms/Showrooms'))
    },
    {
      path: '/apps/e-commerce/contact/:contactId',
      component: React.lazy(() => import('./Contact/Contact'))
    },
    {
      path: '/apps/e-commerce/reports',
      component: React.lazy(() => import('./Reports/Reports'))
    },
    {
      path: '/apps/e-commerce/pricesettings',
      component: React.lazy(() => import('./PriceSetting/PriceSetting'))
    },
    {
      path: '/apps/e-commerce/lensPrice',
      component: React.lazy(() => import('./LensPrice/LensPrice'))
    },
    {
      path: '/apps/e-commerce/viewlens/:lensName',
      component: React.lazy(() => import('./LensPrice/Lens'))
    },
    {
      path: '/apps/e-commerce/create-customer',
      component: React.lazy(() =>
        import('./Customers/update-customer/UpdateCustomer')
      )
    },
    {
      path: '/apps/e-commerce/customers/profile/editinsurance/:insuranceId',
      component: React.lazy(() => import('./Insurance/AddInsurance'))
    },
    {
      path: '/apps/e-commerce/customers/profile/editprescription/:prescriptionId',
      component: React.lazy(() => import('./Prescriptions/Prescriptions'))
    },
    {
      path: '/apps/e-commerce/customers/profile/viewexam/:examId',
      component: React.lazy(() => import('./Exams/Exams'))
    },
    {
      path: '/apps/e-commerce/customers/profile/:customerId',
      component: React.lazy(() => import('./Customers/CustomersProfile'))
    },
    {
      path: '/apps/e-commerce/customers/addRx/:customerId',
      component: React.lazy(() => import('./Prescriptions/Prescriptions'))
    },
    {
      path: '/apps/e-commerce/customers/editRx/:prescriptionId',
      component: React.lazy(() => import('./Prescriptions/Prescriptions'))
    },
    {
      path: '/apps/e-commerce/customers/addinsurance/:customerId',
      component: React.lazy(() => import('./Insurance/AddInsurance'))
    },
    {
      path: '/apps/e-commerce/customers/addExam/:customerId',
      component: React.lazy(() => import('./Exams/Exams'))
    },
    {
      path: '/apps/e-commerce/customers/addAppointment/:customerId',
      component: React.lazy(() => import('./Appointments/Appointments'))
    },
    {
      path: '/apps/e-commerce/customers/:customerId',
      component: React.lazy(() =>
        import('./Customers/update-customer/UpdateCustomer')
      )
    },
    {
      path: '/apps/e-commerce/orders/vieworder/:orderId',
      component: React.lazy(() => import('./Orders/AddOrder'))
    },
    {
      path: '/apps/e-commerce/orders/redoorder/:orderId',
      component: React.lazy(() => import('./Orders/RedoOrder'))
    },
    {
      path: '/apps/e-commerce/orders/addorder/:customerId',
      component: React.lazy(() => import('./Orders/AddOrder'))
    },
    {
      path: '/apps/e-commerce/orders',
      component: React.lazy(() => import('./Orders/Orders'))
    },
    {
      path: '/apps/e-commerce/customers',
      component: React.lazy(() => import('./Customers/Customers'))
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
      path: '/apps/e-commerce/doctors',
      component: React.lazy(() => import('./Doctors/Doctors'))
    },
    {
      path: '/apps/e-commerce/doctor/:doctorId',
      component: React.lazy(() => import('./Doctor/Doctor'))
    },
    {
      path: '/apps/e-commerce/doctor/:doctorId/:doctorHandle?',
      component: React.lazy(() => import('./Doctor/Doctor'))
    },
    {
      path: '/apps/e-commerce/users',
      component: React.lazy(() => import('./Users/Users'))
    },

    {
      path: '/apps/e-commerce/users-management',
      component: React.lazy(() =>
        import('./Users/users-management/UsersManagement'))
      // import('./Users/Users1'))

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
    // {
    //   path: '/apps/e-commerce',
    //   component: () => <Redirect to="/apps/e-commerce/showRooms" />
    // },
    {
      path: '/apps/inventory/addframes/:frameId',
      component: React.lazy(() => import('./Inventory/Frames/AddFrames'))
    },
    {
      path: '/apps/inventory/addframes',
      component: React.lazy(() => import('./Inventory/Frames/AddFrames'))
    },
    {
      path: '/apps/inventory/viewframe/:frameId',
      component: React.lazy(() => import('./Inventory/Frames/ViewFrame'))
    },
    {
      path: '/apps/inventory/addother/:otherId',
      component: React.lazy(() => import('./Inventory/Other/AddOther'))
    },
    {
      path: '/apps/inventory/viewother/:otherId',
      component: React.lazy(() => import('./Inventory/Other/ViewOther'))
    },
    {
      path: '/apps/inventory/addother',
      component: React.lazy(() => import('./Inventory/Other/AddOther'))
    },
    {
      path: '/apps/inventory/addshowroominventory/:showRoomInventoryId',
      component: React.lazy(() =>
        import('./Inventory/ShowRoom Inventory/AddShowRoomInventory')
      )
    },
    {
      path: '/apps/inventory/viewshowroominventory/:showRoomInventoryId',
      component: React.lazy(() =>
        import('./Inventory/ShowRoom Inventory/ViewShowRoomInventory')
      )
    },
    {
      path: '/apps/inventory/addshowroominventory',
      component: React.lazy(() =>
        import('./Inventory/ShowRoom Inventory/AddShowRoomInventory')
      )
    },
    {
      path: '/apps/inventory/addlens/:lensId',
      component: React.lazy(() => import('./Inventory/Lens/AddLens'))
    },
    {
      path: '/apps/inventory/viewlens/:lensId',
      component: React.lazy(() => import('./Inventory/Lens/ViewLens'))
    },
    {
      path: '/apps/inventory/addlens',
      component: React.lazy(() => import('./Inventory/Lens/AddLens'))
    },
    {
      path: '/apps/inventory',
      component: React.lazy(() => import('./Inventory/Inventory'))
    }
  ]
};

export default ECommerceAppConfig;
