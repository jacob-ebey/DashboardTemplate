import LandingPage from './components/LandingPage';

export default [
  {
    label: 'Home',
    path: '/',
    component: LandingPage,
    exact: true,
    childRoutes: [
      {
        path: '/landing',
        component: LandingPage,
      },
    ]
  }
];
