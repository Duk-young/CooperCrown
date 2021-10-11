import React from 'react';

const CompactInvoicePageConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/apps/inventory/lists',
      component: React.lazy(() => import('./InventoryLists'))
    }
  ]
};

export default CompactInvoicePageConfig;
