import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailPage';

export default [
  {
    label: 'Search Page',
    path: '/search',
    component: SearchPage,
    exact: true,
    childRoutes: [
      {
        path: '/detail/:id',
        component: DetailPage,
      },
    ]
  }
];
