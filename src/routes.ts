import type { RouteProps } from 'nostalgie/routing';
import * as React from 'react';

export const routesById = {
  landing: {
    path: '/',
    exact: true,
    component: React.lazy(() => import('./pages/LandingPage')),
  } as RouteProps,
  docs: {
    path: '/docs/',
    exact: false,
    component: React.lazy(() => import('./pages/DocsPage')),
  } as RouteProps,
  changelog: {
    path: '/changelog',
    exact: true,
    component: React.lazy(() => import('./pages/ChangelogPage')),
  } as RouteProps,
};

export const routeIds = Object.keys(routesById) as Array<keyof typeof routesById & string>;
export const routes = routeIds.map((id) => ({
  id,
  ...routesById[id],
}));
