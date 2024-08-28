
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
  }
]

export default router;