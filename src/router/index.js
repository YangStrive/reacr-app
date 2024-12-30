
const router = [
  {
    path: '/',
    element: require('../pages/home').default,
  },
  {
    path:'/about',
    element: require('../pages/about').default,
  },
  {
    path:'/antd3Form',
    element: require('../pages/antd3Form').default,
  },
  {
    path:'/antd4Form',
    element: require('../pages/antd4Form').default,
  },
  {
    path:'/redux',
    element: require('../pages/redux').default,
  },
  {
    path:'/noRedux',
    element: require('../pages/noRedux').default,
  }
]

export default router;
