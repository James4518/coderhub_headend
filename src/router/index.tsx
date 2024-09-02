import React, { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/views/home'));
const Register = lazy(() => import('@/views/register'));
const Login = lazy(() => import('@/views/login'));
const Personal = lazy(() => import('@/views/personal'));
const NotFound = lazy(() => import('@/views/notFound'));
const Creater = lazy(() => import('@/views/creator'));
const Publish = lazy(() => import('@/views/creator/cpns/publish'));

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
    element: <Creater />,
    children: [
      {
        path: '/creator/publish',
        element: <Publish />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
