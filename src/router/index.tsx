import React, { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

const Home = lazy(() => import('@/views/home'));
const Register = lazy(() => import('@/views/register'));
const Login = lazy(() => import('@/views/login'));
const Personal = lazy(() => import('@/views/personal'));
const NotFound = lazy(() => import('@/views/notFound'));
const Creator = lazy(() => import('@/views/creator'));
const CreatorHome = lazy(() => import('@/views/creator/cpns/home'));
const ContentMoment = lazy(() => import('@/views/creator/cpns/content/moment'));
const CreatorFansData = lazy(() => import('@/views/creator/cpns/data/fans'));
const CreatorContentData = lazy(
  () => import('@/views/creator/cpns/data/content')
);
const CreatorHelp = lazy(() => import('@/views/creator/cpns/help'));
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
      },
      {
        path: '/creator/content/moment',
        element: <ContentMoment />
      },
      {
        path: '/creator/data/fans',
        element: <CreatorFansData />
      },
      {
        path: '/creator/data/content',
        element: <CreatorContentData />
      },
      {
        path: '/creator/help/questions',
        element: <CreatorHelp />
      }
    ]
  },
  {
    path: '/label/:labelName',
    element: <Label />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
