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
const ContentDraft = lazy(() => import('@/views/creator/cpns/content/draft'));
const FansData = lazy(() => import('@/views/creator/cpns/data/fans'));
const FansOverall = lazy(
  () => import('@/views/creator/cpns/data/fans/cpns/overall')
);
const FansList = lazy(() => import('@/views/creator/cpns/data/fans/cpns/list'));
const ContentData = lazy(() => import('@/views/creator/cpns/data/content'));
const ContentDataOverall = lazy(
  () => import('@/views/creator/cpns/data/content/cpns/overall')
);
const ContentDataSingle = lazy(
  () => import('@/views/creator/cpns/data/content/cpns/single')
);
const CreatorHelp = lazy(() => import('@/views/creator/cpns/help'));
const Publish = lazy(() => import('@/views/creator/cpns/publish'));
const Label = lazy(() => import('@/views/label/index'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />
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
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: <CreatorHome />
      },
      {
        path: 'publish',
        element: <Publish />
      },
      {
        path: 'content/moment',
        element: <ContentMoment />
      },
      {
        path: 'content/draft',
        element: <ContentDraft />
      },
      {
        path: 'data/fans',
        element: <FansData />,
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <FansOverall />
          },
          {
            path: 'list',
            element: <FansList />
          }
        ]
      },
      {
        path: 'data/content',
        element: <ContentData />,
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <ContentDataOverall />
          },
          {
            path: 'single',
            element: <ContentDataSingle />
          }
        ]
      },
      {
        path: 'help/questions',
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
