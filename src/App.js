import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Loading from './components/Loading';

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
      errorElement: <div>Error</div>,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: 'list/*',
          element: (
            <Suspense fallback={<Loading />}>
              <ListPage />
            </Suspense>
          ),
        },
        {
          path: 'register/*',
          element: (
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          ),
          children: [
            {
              index: true,
              path: 'modal',
              element: (
                <Suspense fallback={<Loading />}>
                  <ModalRegister />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
