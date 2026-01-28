import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Loading from './components/Loading';
import RouteErrorBoundary from './components/RouteErrorBoundary';

const DashboardPage = React.lazy(() => import('DashboardApp/DashboardPage'));
const ListPage = React.lazy(() => import('ListApp/ListRoutes'));
const RegisterPage = React.lazy(() => import('RegisterApp/RegisterPage'));
const ModalRegister = React.lazy(() => import('RegisterApp/ModalRegister'));

const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
          ),
          errorElement: <RouteErrorBoundary />,
        },
        {
          path: 'list/*',
          element: (
            <Suspense fallback={<Loading />}>
              <ListPage />
            </Suspense>
          ),
          errorElement: <RouteErrorBoundary />,
        },
        {
          path: 'register/*',
          element: (
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          ),
          errorElement: <RouteErrorBoundary />,
          children: [
            {
              index: true,
              path: 'modal',
              element: (
                <Suspense fallback={<Loading />}>
                  <ModalRegister />
                </Suspense>
              ),
              errorElement: <RouteErrorBoundary />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
