
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
  }
]

export default router;