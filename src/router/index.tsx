import React, { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/views/home'));
const Register = lazy(() => import('@/views/register'));
const Login = lazy(() => import('@/views/login'));
const Personal = lazy(() => import('@/views/personal'));
const NotFound = lazy(() => import('@/views/notFound'));
const Creator = lazy(() => import('@/views/creator'));
const CreatorHome = lazy(() => import('@/views/creator/cpns/home'));
const Publish = lazy(() => import('@/views/creator/cpns/publish'));
const Label = lazy(() => import('@/views/label/index'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/personal',
    element: <Personal />
  },
  {
    path: '/creator',
    element: <Creator />,
    children: [
      {
        index: true,
        element: <Navigate to="/creator/home" />
      },
      {
        path: '/creator/home',
        element: <CreatorHome />
      },
      {
        path: '/creator/publish',
        element: <Publish />
      }
    ]
  },
  {
    path: '/label/:labelName',
    element: <Label />
  },
  {
    path: '/label',
    element: <Label />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
