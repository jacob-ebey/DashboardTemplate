import TestPage from './components/TestPage';
import TestPage2 from './components/TestPage2';

export default [
  {
    label: 'Test Page',
    path: '/test',
    component: TestPage,
    exact: true,
    childRoutes: [
      {
        path: '/test/:id',
        component: TestPage2,
      },
    ]
  }
];
